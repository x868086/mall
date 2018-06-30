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
        },
        add:function(state,instance){
            instance.id=Math.floor(Math.random()*100000)
            state.lists.push(instance)
        },
        update:function(state,data){
            let index=state.lists.findIndex(item=>{
                return item.id===data.id;
            })
            state.lists[index]=data
        }
    },
    actions:{
        getAction:function(context){
            AddressService.getlist().then(res=>{
                context.commit("init",res.data.lists)
            })

        },
        addAction:function(context,instance){
            AddressService.add(instance).then(res=>{
                context.commit("add",instance)
            })
        },
        updateAction:function(context,data){
            AddressService.update(data).then(res=>{
                context.commit("update",data)
            })
        }
    }
})

export default store;