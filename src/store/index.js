import Vue from 'vue';
import Vuex from 'vuex';
import sheetData from './modules/sheetData';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        sheetData,
    },
    strict: true,
});