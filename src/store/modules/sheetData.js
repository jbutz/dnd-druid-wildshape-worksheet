const DEFAULT_STATE = {
    name: 'Test Name',
    maxCr: '1',
    duration: '1 hr',
    canFly: false,
    canSwim: false,
    creatures: [
        {
            name: 'Dire Wolf',
            size: 'Large',
            speed: '30ft',
            hitDice: '5d10',
            str: '17',
            dex: '15',
            con: '15',
            cr: '1',
            hp: '37',
            ac: '14',
            //details: [
            //    "Skills: Perception +3, Stealth +4          Senses: passive Perception 13",
            //    "Keen Hearing and Smell. The wolf has advantage on Wisdom (Perception) checks that rely on hearing or smell.",
            //    "Pack Tactics. The wolf has advantage on an attack roll against a creature if at least one of the wolf's allies is within 5 feet of the creature and the ally isn't incapacitated.",
            //    "Bite. Melee Weapon Attack: +5 to hit, reach 5 ft., one target.",
            //    "  Hit: 10 (2d6 + 3) piercing damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone."
            //],
            details: [
                'Perception +3, Stealth +4, passive Perception 13, Keen Hearing and Smell, Pack Tactics',
                'Bite. Melee Weapon Attack: +5 to hit, reach 5 ft., one target.',
                '  Hit: 10 (2d6 + 3) piercing damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone.'
            ]
        },
        {
            name: '|',
            size: '|',
            speed: '|',
            hitDice: '|',
            str: '18',
            dex: '18',
            con: '18',
            cr: '1',
            hp: '200',
            ac: '18',
            details: []
        },
        {
            name: '|',
            size: '|',
            speed: '|',
            hitDice: '|',
            str: '18',
            dex: '18',
            con: '18',
            cr: '1',
            hp: '200',
            ac: '18',
            details: []
        }
    ]
};

const state = Object.assign({}, DEFAULT_STATE);

// getters
const getters = {
    sheetData: state => state,
    ...(() => {
        let propGetters = {};
        Object.keys(DEFAULT_STATE).forEach(key => {
            propGetters[
                `sheetData${key.substr(0, 1).toUpperCase()}${key.substr(1)}`
            ] = state => state[key];
        });

        return propGetters;
    })()
};

// actions
const actions = {
    /*...(() => {
        let propActions = {};

        Object.keys(DEFAULT_STATE).forEach(key => {
            let name = `set${key.substr(0, 1).toUpperCase()}${key.substr(1)}`;
            propActions[name] = ({ commit }, value) => {
                commit(name, value || DEFAULT_STATE[key]);
            };
        });

        return propActions;
    })(),*/
    setName({commit}, value) {
        commit('setProperty', ['name', value || DEFAULT_STATE.name]);
    },
    setMaxCr({commit}, value) {
        commit('setProperty', ['maxCr', value || DEFAULT_STATE.maxCr]);
    },
    setDuration({commit}, value) {
        commit('setProperty', ['duration', value || DEFAULT_STATE.duration]);
    },
    setCanFly({commit}, value) {
        commit('setProperty', ['canFly', value]);
    },
    setCanSwim({commit}, value) {
        commit('setProperty', ['canSwim', value]);
    },
};

// mutations
const mutations = {
    /*...(() => {
        let propMutations = {};

        Object.keys(DEFAULT_STATE).forEach(key => {
            let name = `set${key.substr(0, 1).toUpperCase()}${key.substr(1)}`;
            propMutations[name] = (state, value) => {
                state[key] = value
            };
        });

        return propMutations;
    })()*/
    setProperty(state, [property, value]) {
        state[property] = value;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
