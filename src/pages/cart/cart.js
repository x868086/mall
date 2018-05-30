import './cart_base.css';
import './cart_trade.css';
import './cart.css';

import Vue from 'vue';
import axios from 'axios';
import url from 'js/api.js';
import mixin from 'js/mixin.js';

new Vue({
    el:".container",
    data:{
        cartList:null
    },
    computed:{
        totalSelector:{
            get:function(){
                //当异步获取的数据有值的时候再遍历判断
                if(this.cartList&&this.cartList.length){
                    return this.cartList.every(shop=>{
                        return shop.checked
                    })
                } else{
                    return false
                }

            },
            set:function(newvalue){
                this.cartList.forEach(shop=>{
                    shop.checked=newvalue
                    shop.goodsList.forEach(goods=>{
                        goods.checked=newvalue
                    })
                })
            }
        },
        //计算属性，遍历已选中的商品列表，生成选中商品列表数组
        selectLists:function(){
            let goodsArr=[]
            if(this.cartList&&this.cartList.length){
                this.cartList.forEach(shop=>{
                    shop.goodsList.forEach(goods=>{
                        if(goods.checked===true){
                            goodsArr.push(goods)
                        }
                    })
                })
            }else{
                return []
            }
            return goodsArr

        },
        //计算属性，遍历已预选中的商品列表数组，计算总价格
        totalPrice:function(){
            let total=0;
            this.selectLists.forEach(goods=>{
                total +=goods.price*goods.number
            })
            return total
        }

    },
    methods:{
        getCartList:function(){
            axios.post(url.getCartList).then(res=>{
                let lists=res.data.cartList;
                lists.forEach(shop=>{
                    shop.checked=true
                    shop.goodsList.forEach(goods=>{
                        goods.checked=true;
                    })
                })

                this.cartList=lists;
            }).catch(res=>{
                console.log('getCartList error')
            })
        },
        // 每次点击商品的时候遍历当前商品所属的店铺，其店铺下的所有商品是否被选中，即商品的checked是否为true,every方法
        selectGoods:function(shop,goods){
            goods.checked=!goods.checked
        // every遍历的结果赋值给shop.checked,当每个商品都被选中时返回true，此时shop.checked为true
            shop.checked=shop.goodsList.every(good=>{
                return good.checked
            })
        },
        // 每次点击店铺的时候，遍历店铺下的所有商品，改变所有商品的checked状态，商品的状态与店铺的选中状态保持一致
        selectShop:function(shop){
            shop.checked=!shop.checked
            shop.goodsList.forEach(goods=>{
                goods.checked=shop.checked
            })
        },
        allChecked:function(){
            this.totalSelector=!this.totalSelector
        }
    },
    created:function(){
        this.getCartList()
    },
    mounted:function(){

    },
    mixins:[mixin]
})