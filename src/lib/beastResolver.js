const BEASTS_MAP = (ctx => {
    let keys = ctx.keys();
    let values = keys.map(ctx);
    
    let beastMap = Array.concat.call([], values).reduce((completeBeastsMap, beastsFileObj) => {
        return {
            ...completeBeastsMap,
            ...beastsFileObj,
        };
    }, {});

    return Object.values(beastMap).sort((a, b) => a.name > b.name);
})(require.context('../data/beasts',true, /.*\.js/));


export function resolveBeast(beastName) {
    
    let foundBeast = BEASTS_MAP.find((beast) => beast.name === beastName);

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
    return Object.values(BEASTS_MAP).map((beast) => beast.name);
}