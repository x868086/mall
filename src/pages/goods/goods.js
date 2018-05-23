
import "./goods_common.css";
import "./goods_custom.css";
import "./goods.css";
import "./goods_theme.css";
import "./goods_mars.css";
import "./goods_sku.css";

import Vue from "vue";
import axios from "axios";
import url from "js/api.js";
import qs from "qs";

import mixin from "js/mixin.js";


 let {id}=qs.parse(location.search.substr(1));
 let tabContent=["商品详情","成交记录"]

new Vue({
    el:"#app",
    created:function(){
        this.getDetails();

    },

    data:{
        detailsList:null,
        curIndex:0,
        tabContent:tabContent,
        sellList:null
    },

    methods:{
        getDetails:function(){
            /*这里向后台传递的参数id，是要通过qs模块从url地址栏中获取*/
            axios.post(url.getDetails,{id}).then(res=>{
                this.detailsList=res.data.data
            }).catch(res=>{
                console.log('getDetails error')
            })
        },
        changeIndex:function(index){
            this.curIndex=index;
            if(index===1){
                this.getsellList();
            }
        },
        getsellList:function(){
            axios.post(url.getDeal,{id}).then(res=>{
                this.sellList=res.data.data.lists
            }).catch(res=>{
                console.log('sellList error')
            })
        }
    },

    components:{

    },

    mixins:[mixin]

})