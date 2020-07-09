import Vuex from 'vuex';
import Vue from 'vue';
import menu from './modules/menu.js'
import login from './modules/login.js'
import createPersistedState from 'vuex-persistedstate'
//import game from './modules/game'

Vue.use(Vuex);


export default new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    modules: {
        menu,
        login
    }
})