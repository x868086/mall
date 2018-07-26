
import "./goods_common.css";
import "./goods_custom.css";
import "./goods.css";
import "./goods_theme.css";
import "./goods_mars.css";
import "./goods_sku.css";
import "./goods_transition.css";

import Vue from "vue";
import axios from "axios";
import url from "js/api.js";
import qs from "qs";

import mixin from "js/mixin.js";

import Swipe from 'components/Swipe.vue';


 let {id}=qs.parse(location.search.substr(1));
 let tabContent=["商品详情","成交记录"]

new Vue({
    el:"#app",
    created:function(){
        this.getDetails();

    },

    data:{
        id:id,
        detailsList:null,
        curIndex:0,
        tabContent:tabContent,
        sellList:null,
        bannerLists:[],
        showSku:false,
        skuIndex:1,
        skuNumber:1,
        inCart:false,
        inCartMessage:false
    },

    methods:{
        getDetails:function(){
            /*这里向后台传递的参数id，是要通过qs模块从url地址栏中获取*/
            axios.post(url.getDetails,{id}).then(res=>{
                this.detailsList=res.data.data
                res.data.data.imgs.forEach((e,i,a)=>{
                    console.log(e)
                    this.bannerLists.push({
                        clickUrl:"",
                        img:e
                    })
                })
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
        },
        changeSkuIndex:function(value){
            this.skuIndex=value;
            this.showSku=true;
        },
        changeSkuNumber:function(value){
            if(value<0&&this.skuNumber===1){
                return
            }
            this.skuNumber+=value;
        },
        getCart:function(){
            axios.post(url.getCart,{
                id:this.id,
                number:this.skuNumber
            }).then(res=>{
                if(res.status===200){
                    this.inCart=true;
                    this.inCartMessage=true;
                    this.showSku=false;
                }
                setTimeout(res=>{
                    this.inCartMessage=false;
                },1000)
            })
        }
    },

    watch:{
        showSku(val,oldval){
            if(val){
                document.body.style.overflow="hidden";
            } else if(!val){
                document.body.style.overflow="auto";
            }
        } 
    },

    components:{
        Swipe:Swipe
    },

    mixins:[mixin]

})