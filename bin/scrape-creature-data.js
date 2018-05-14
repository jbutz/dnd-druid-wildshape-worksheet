/* eslint-env node, browser */
const puppeteer = require('puppeteer');
const fs = require('fs');
const _chunk = require('lodash/chunk');

puppeteer
    .launch({
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    })
    .then(async browser => {
        const page = await browser.newPage();
        await page.goto('https://5thsrd.org/gamemaster_rules/monster_indexes/monsters_by_type/');

        const paths = await page.evaluate(async () => {
            let beastParagraphEl = document.querySelector('#beast + p');
            return Array.from(beastParagraphEl.children)
                .filter(el => el.nodeName === 'A')
                .map(el => el.href);
        });
        await page.close();

        const creatureData = await Promise.all(
            (() => {
                let creatureBatches = _chunk(paths, 5);
                return creatureBatches.reduce((result, batch, idx) => {
                    let delay = idx * 500;
                    return result.concat(
                        batch.map(url => {
                            if (delay === 0) {
                                return processCreaturePage(url, browser, _processActions);
                            }

                            return new Promise(resolve => {
                                setTimeout(() => {
                                    resolve(processCreaturePage(url, browser, _processActions));
                                }, delay);
                            });
                        })
                    );
                }, []);
            })()
        );

        fs.writeFileSync('./beasts.json', JSON.stringify(creatureData));

        await browser.close();

        process.exit(0);
    });

async function processCreaturePage(pageUrl, browser) {
    try {
        const page = await browser.newPage();
        await page.exposeFunction('_processActions', _processActions);
        await page.exposeFunction('_consoleLog', console.log);
        await page.goto(pageUrl);

        let data = await page.evaluate(async () => {
            // Name
            let creatureNameHeaderEl = document.querySelector('.container h1');
            let creatureName = creatureNameHeaderEl.textContent.trim();

            // Size / Type / Alignment
            let sizeTypeAlign = creatureNameHeaderEl.nextElementSibling.textContent;
            let size = sizeTypeAlign
                .toLowerCase()
                .split('beast')[0]
                .trim();

            // Attributes
            let attributesParagraphEl = creatureNameHeaderEl.nextElementSibling.nextElementSibling;

            let acTextEl = attributesParagraphEl.children[0];
            let armorClass = acTextEl.nextSibling.textContent.trim();
            let hpTextEl = attributesParagraphEl.children[2];
            let hitPoints = hpTextEl.nextSibling.textContent.trim();
            let speedTextEl = attributesParagraphEl.children[4];
            let speed = speedTextEl.nextSibling.textContent.trim();

            // Ability Scores
            let abilitiesTableEl = attributesParagraphEl.nextElementSibling;
            let valuesTrEl = abilitiesTableEl.querySelector('tbody tr');

            let strText = valuesTrEl.children[0].textContent.trim();
            let dexText = valuesTrEl.children[1].textContent.trim();
            let conText = valuesTrEl.children[2].textContent.trim();

            // Skills, Senses, CR
            let skillsAndSensesParagraphEl = abilitiesTableEl.nextElementSibling;
            let skillsText = '',
                sensesText = (''.languagesText = ''),
                challengeText = '';

            for (let el of skillsAndSensesParagraphEl.children) {
                if (el.nodeName === 'STRONG') {
                    let elText = el.textContent.trim().toLowerCase();

                    if (elText === 'skills') {
                        skillsText = el.nextSibling.textContent.trim();
                    } else if (elText === 'senses') {
                        sensesText = el.nextSibling.textContent.trim();
                    } else if (elText === 'languages') {
                        languagesText = el.nextSibling.textContent.trim().replace('--', '');
                    } else if (elText === 'challenge') {
                        challengeText = el.nextSibling.textContent.trim().replace(/ \(.*\)$/, '');
                    }
                }
            }

            // Actions
            let actionsParagraphEl = skillsAndSensesParagraphEl.nextElementSibling;

            let actionsArray = await _processActions(actionsParagraphEl);
            //if(actionsParagraphEl.nextElementSibling && actionsParagraphEl.nextElementSibling.nodeName === 'H3') {
            //    actionsArray = actionsArray.concat(await _processActions(actionsParagraphEl.nextElementSibling.nextElementSibling));
            //}

            return {
                name: creatureName,
                size,
                ac: armorClass,
                hp: hitPoints,
                speed,
                str: strText,
                dex: dexText,
                con: conText,
                skills: skillsText,
                senses: sensesText,
                cr: challengeText,
                languages: languagesText,
                actions: actionsArray
            };
        });
        await page.close();

        return data;
    } catch (error) {
        console.error(pageUrl, error);
    }
}

function _processActions(actionsContainerEl) {
    console.log('Processing', actionsContainerEl.innerHTML);
    return Array.from(actionsContainerEl.children || []).reduce((accumulator, el) => {
        if (el.nodeName === 'STRONG') {
            accumulator.push(el.textContent.trim());
            if (el.nextSibling.nodeName === '#text') {
                accumulator[accumulator.length - 1] += ` ${el.nextSibling.textContent.trim()}`;
            }
        } else if (el.nodeName === 'EM') {
            accumulator.push(` ${el.textContent.trim()}`);
            if (el.nextSibling.nodeName === '#text') {
                accumulator[accumulator.length - 1] += ` ${el.nextSibling.textContent.trim()}`;
            }
        }
        return accumulator;
    }, []);
}
