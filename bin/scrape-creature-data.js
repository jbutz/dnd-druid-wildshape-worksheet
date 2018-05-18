/* eslint-env node, browser */
const puppeteer = require('puppeteer');
const fs = require('fs');
const _= require('lodash');

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
                let creatureBatches = _.chunk(paths, 5);
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
        await page.exposeFunction('_compact', (...args) => _.compact(...args));
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
                (await _compact([skillsText, sensesText])).join(', ').trim(),
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
                //skills: skillsText,
                //senses: sensesText,
                cr: challengeText,
                languages: languagesText,
                //actions: actionsArray,
                details
            };
        });
        await page.close();

        return transformData(data);
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

function transformData(data) {
    data.details = data.details.map((detail) =>
        _.chain(detail)
            .thru(_transformPassivePerception)
            .thru(_transformPackTactics)
            .thru(_transformKeenSmell)
            .thru(_transformKeenSight)
            .thru(_transformKeenHearingSmell)
            .thru(_transformFlyBy)
            .thru(_transformAmphibious)
            .thru(_transformEcholocation)
            .thru(_transformKeenHearing)
            .thru(_transformSureFooted)
            .thru(_transformKeenHearingSight)
            .thru(_transformWaterBreathing)
            .thru(_transformBloodyFrenzy)
            .thru(_transformSpiderClimb)
            .thru(_transformWebSense)
            .thru(_transformWebWalkrer)
            .thru(_transformCharge)
            .value()
    );

    return data;
}


function _transformPassivePerception(value) {
    return value.replace('passive Perception', 'Passive Perception');
}

function _transformPackTactics(value) {
    return value.replace(/Pack Tactics\. The (.+) has advantage on an attack roll against a creature if at least one of the (.+) allies is within 5 feet of the creature and the ally isn\'t incapacitated\./, 'Pack Tactics.');
}

function _transformKeenSmell(value) {
    return value.replace(/Keen Smell\. The (.+) has advantage on Wisdom \(Perception\) checks that rely on smell\./, 'Keen Smell.');
}

function _transformKeenSight(value) {
    return value.replace(/Keen Sight\. The (.+) has advantage on Wisdom \(Perception\) checks that rely on sight\./, 'Keen Sight.');
}

function _transformKeenHearingSmell(value) {
    return value.replace(/Keen Hearing and Smell\. The (.+) has advantage on Wisdom \(Perception\) checks that rely on hearing or smell\./, 'Keen Hearing and Smell.');
}

function _transformFlyBy(value) {
    return value.replace(/Flyby\. The (.+) doesn\'t provoke opportunity attacks when it flies out of an enemy's reach\./, 'Flyby.');
}

function _transformAmphibious(value) {
    return value.replace(/Amphibious\. The (.+) can breathe air and water\./, 'Amphibious.');
}

function _transformEcholocation(value) {
    return value.replace(/Echolocation\. The (.+) can't use its blindsight while deafened\./, 'Echolocation.');
}

function _transformKeenHearing(value) {
    return value.replace(/Keen Hearing\. The (.+) has advantage on Wisdom \(Perception\) checks that rely on hearing\./, 'Keen Hearing.');
}

function _transformSureFooted(value) {
    return value.replace(/Sure-Footed\. The (.+) has advantage on Strength and Dexterity saving throws made against effects that would knock it prone\./, 'Sure-Footed.');
}

function _transformKeenHearingSight(value) {
    return value.replace(/Keen Hearing and Sight\. The (.+) has advantage on Wisdom \(Perception\) checks that rely on hearing or sight\./, 'Keen Hearing and Sight.');
}

function _transformWaterBreathing(value) {
    return value.replace(/Water Breathing\. The (.+) can breathe only underwater\./, 'Water Breathing.');
}

function _transformBloodyFrenzy(value) {
    return value.replace(/Blood Frenzy\. The (.+) has advantage on melee attack rolls against any creature that doesn't have all its hit points\./, 'Bloody Frenzy.');
}

function _transformSpiderClimb(value) {
    return value.replace(/Spider Climb\. The (.+) can climb difficult surfaces, including upside down on ceilings, without needing to make an ability check\./, 'Spider Climb.');
}

function _transformWebSense(value) {
    return value.replace(/Web Sense\. While in contact with a web, the (.+) knows the exact location of any other creature in contact with the same web\./, 'Web Sense.');
}

function _transformWebWalkrer(value) {
    return value.replace(/Web Walker\. The (.+) ignores movement restrictions caused by webbing\./, 'Web Walker.');
}

function _transformCharge(value) {
    let matchObj = value.match(/Charge\. If the .+ moves at least (.+) feet straight toward a target and then hits it with a (.+) attack on the same turn, the target takes an extra (.+) damage. If the target is a creature, it must succeed on a (.+) saving throw or be knocked prone./)

    return matchObj ? `Charge. ${matchObj[1]}ft, ${matchObj[2]} attack, ${matchObj[3]}, if creature ${[matchObj[4]]} saving throw or prone` : value;
}


// "Relentless (Recharges after a Short or Long Rest). If the boar takes 7 damage or less that would reduce it to 0 hit points, it is reduced to 1 hit point instead.",