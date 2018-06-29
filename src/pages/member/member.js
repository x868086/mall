// import './member_base.css';
// import './member.css';

import Vue from 'vue';
import router from './router/index.js';

import store from './vuex/index.js'

new Vue({
    el:"#app",
    router:router,
    store:store
})