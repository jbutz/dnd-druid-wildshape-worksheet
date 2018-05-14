import beastData from '../../data/beasts.json';


export function resolveBeast(beastName) {
    
    let foundBeast = beastData.find((beast) => beast.name === beastName);

    return Object.assign({
        name: beastName,
        size: '',
        speed: '',
        hitDice: '',
        str: '',
        dex: '',
        con: '',
        cr: '',
        hp: '',
        ac: '',
        details: []
    }, foundBeast || {});
}

export function getBeasts() {
    return beastData.map((beast) => beast.name);
}