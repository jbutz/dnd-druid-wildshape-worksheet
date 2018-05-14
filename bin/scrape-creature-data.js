/* eslint-env node, browser */
const puppeteer = require('puppeteer');
const fs = require('fs');
const _chunk = require('lodash/chunk');

puppeteer
    .launch()
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
                                return processCreaturePage(url, browser, _processActions)
                                .catch((error) => {
                                    console.error('Error occured with', url);
                                    throw error;
                                });
                            }

                            return new Promise(resolve => {
                                setTimeout(() => {
                                    resolve(processCreaturePage(url, browser, _processActions));
                                }, delay);
                            })
                            .catch((error) => {
                                console.error('Error occured with', url);
                                throw error;
                            });
                        })
                    );
                }, []);
            })()
        );

        fs.writeFileSync('./data/beasts.json', JSON.stringify(creatureData, null, 4));

        await browser.close();

        process.exit(0);
    });

async function processCreaturePage(pageUrl, browser) {
    console.log('Processing', pageUrl);
    try {
        const page = await browser.newPage();
        await page.goto(pageUrl);
        await page.exposeFunction('_consoleLog', (...args) => console.log(...args));
        await page.addScriptTag({
            content: _processActions.toString()
        });
        await page.addScriptTag({
            content: upperCaseFirstCharacter.toString()
        });
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
            let armorClass = acTextEl.nextSibling.textContent.replace(/\D/g,'').trim();
            let hpTextEl = attributesParagraphEl.children[2];
            let hitDice = hpTextEl.nextSibling.textContent.trim()
                .replace(/^\d+ \(/, '').replace(/ \+ \d+\)$/,'');
            let hitPoints = hpTextEl.nextSibling.textContent.trim().replace(/ \(.*$/, '');
            
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
            let currentActionsElement = skillsAndSensesParagraphEl.nextElementSibling;
            let actionsArray = []
            while(currentActionsElement !== null) {
                if(currentActionsElement.nodeName === 'P') {
                    actionsArray = actionsArray.concat(_processActions(currentActionsElement));
                }
                currentActionsElement = currentActionsElement.nextElementSibling;    
            }

            let details = [
                `${skillsText},  ${sensesText}`,
                ...actionsArray,
            ]

            return {
                name: creatureName,
                size: upperCaseFirstCharacter(size),
                ac: armorClass,
                hp: hitPoints,
                hitDice,
                speed,
                str: strText,
                dex: dexText,
                con: conText,
                skills: skillsText,
                senses: sensesText,
                cr: challengeText,
                languages: languagesText,
                actions: actionsArray,
                details
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

function upperCaseFirstCharacter(text) {
    return `${text.substr(0,1).toUpperCase()}${text.substr(1)}`
}