import 'css/common.css';
import './category.css';

import Vue from 'vue';
import axios from 'axios';
import url from 'js/api.js';



// import Foot from 'components/Foot.vue';
import mixin from 'js/mixin.js'

new Vue({
    el:"#app",
    data:{
        topLists:null,
        topIndex:0,
        rankData:null,
        subData:null
    },
    created(){
        this.getLists();
        this.getSublists(0);
    },
    methods:{
        getLists: function(){
            axios.post(url.topLists,{})
            .then(res=>{
                this.topLists=res.data.lists
            }).catch(res=>{
                console.log('getToplists error')
            })
        },
        getSublists: function(index,id){
            this.topIndex=index;
            if(index===0){
                this.getRank();
            }else{
                axios.post(url.subLists,{id}).then(res=>{
                    this.subData=res.data.data
                }).catch(
                    res=>{
                        console.log('getsublist error')
                    }
                )
            }
            
        },
        getRank: function(){
            axios.post(url.rank).then(res=>{
                console.log(res.data.data)
                this.rankData=res.data.data
            }).catch(res=>{
                console.log('get error')
            })
        },
        toSearch:function(list){
            location.href=`search.html?keyword=${list.name}&id=${list.id}`
        }

    },
    
    // components:{
    //     Foot:Foot,
    // }
    mixins:[mixin]
})