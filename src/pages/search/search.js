import 'css/common.css';
import './search.css';


import Vue from 'vue';
import axios from 'axios';
import url from 'js/api.js';
import qs from 'qs';
// import Foot from 'components/Foot.vue';

import mixin from 'js/mixin.js'

let {keyword,id}=qs.parse(location.search.substr(1))

new Vue({
    el:".container",
    data:{
        searchList:null,
        keyword:keyword,
        isShow:false
    },
    created:function(){
        this.getSearchList()
        // this.move()
    },
    methods:{
        getSearchList: function(){
            axios.post(url.searchList,{keyword,id}).then(res=>{
                this.searchList=res.data.lists
            }).catch(res=>{
                console.log('getDearchList error')
            })
        },
        move: function(){
            if(document.documentElement.scrollTop > 100){
                this.isShow=true;
            }else{
                this.isShow=false;
            }
        },
        toTop:function(){
            document.documentElement.scroll(0,0);
            this.isShow=false;
        }

    },
    // filters:{
    //     fixnumber:function(value){
    //         return value + '.00'
    //     }
    // },
    // components:{
    //     Foot:Foot,
    // }
    mixins:[mixin]
})