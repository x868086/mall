import Vue from 'vue';
import Vuex from 'vuex';

import AddressService from 'js/addressService.js';

Vue.use(Vuex);

const store=new Vuex.Store({
    state:{
        lists:null
    },
    mutations:{
        init:function(state,list){
            state.lists=list
        }
    },
    actions:{
        getAction:function(context){
            AddressService.getlist().then(res=>{
                context.commit("init",res.data.lists)
            })

        }
    }
})

export default store;