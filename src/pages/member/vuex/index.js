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
            let arr=JSON.parse(JSON.stringify(state.lists))
            let index=arr.findIndex(item=>{
                return item.id===data.id;
            })
            arr[index]=data;
            state.lists=arr
        },
        remove:function(state,id){
            let index=state.lists.findIndex(item=>{
                return item.id===id
            })
            state.lists.splice(index,1)
        },
        setDefault:function(state,id){
            state.lists.forEach(item=>{
                item.id===id?item.isDefault=true:item.isDefault=false;
            })
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
        },
        removeAction:function(context,id){
            AddressService.remove(id).then(res=>{
                context.commit("remove",id)
            })
        },
        setDefaultAction:function(context,id){
            AddressService.default(id).then(res=>{
                context.commit("setDefault",id)
            })
        }
    }
})

export default store;