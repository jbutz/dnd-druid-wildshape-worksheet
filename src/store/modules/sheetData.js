import { resolveBeast } from '../../lib/beastResolver';
const DEFAULT_STATE = {
    name: 'Test Name',
    maxCr: '1/4',
    duration: '1 hr',
    canFly: false,
    canSwim: false,
    creatures: []
};

const state = Object.assign(
    {},
    {
        sheetData: DEFAULT_STATE
    }
);

const getters = {
    sheetData: state => state.sheetData,
    ...(() => {
        let propGetters = {};
        Object.keys(DEFAULT_STATE).forEach(key => {
            propGetters[
                `sheetData${key.substr(0, 1).toUpperCase()}${key.substr(1)}`
            ] = state => state.sheetData[key];
        });
        return propGetters;
    })()
};

// actions
const actions = {
    setName({ commit }, value) {
        commit('setProperty', ['name', value || DEFAULT_STATE.name]);
    },
    setMaxCr({ commit }, value) {
        commit('setProperty', ['maxCr', value || DEFAULT_STATE.maxCr]);
    },
    setDuration({ commit }, value) {
        commit('setProperty', ['duration', value || DEFAULT_STATE.duration]);
    },
    setCanFly({ commit }, value) {
        commit('setProperty', ['canFly', value]);
    },
    setCanSwim({ commit }, value) {
        commit('setProperty', ['canSwim', value]);
    },
    setCreature({ commit }, [creatureName, creaturePosition]) {
        commit('setCreature', [creatureName, creaturePosition]);
    }
};

const mutations = {

    setProperty(state, [property, value]) {
        state.sheetData[property] = value;
    },
    setCreature(state, [creatureName, creaturePosition]) {
        let creaturesArray = Array.from(state.sheetData.creatures);

        creaturesArray[creaturePosition] = Object.assign(
            creaturesArray[creaturePosition] || {},
            resolveBeast(creatureName)
        );

        state.sheetData.creatures = creaturesArray;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
