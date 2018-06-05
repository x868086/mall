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
        cartList:null,
        shopEdit:false,
        shopEditIndex:-1
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
        },

        removeLists:function(){

        },

        totalRemove:{
            get:function(){
                if(this.shopEdit){
                    return this.shopEdit.removeChecked
                }
                return false
            },
            set:function(newval){
                if(this.shopEdit){
                    this.shopEdit.removeChecked=newval;
                    this.shopEdit.goodsList.forEach(goods=>{
                        goods.removeChecked=newval
                    })
                }

            }
        }



    },
    methods:{
        getCartList:function(){
            axios.post(url.getCartList).then(res=>{
                let lists=res.data.cartList;
                lists.forEach(shop=>{
                    //数据拉取后增加店铺标记状态
                    shop.checked=true;
                    shop.removeChecked=false;
                    shop.editing=false;
                    shop.editingMsg="编辑";
                    shop.goodsList.forEach(goods=>{
                        goods.checked=true;
                        goods.removeChecked=false;
                    })
                })

                this.cartList=lists;
            }).catch(res=>{
                console.log('getCartList error')
            })
        },
        // 每次点击商品的时候先确定是否是编辑状态，然后遍历当前商品所属的店铺，其店铺下的所有商品是否被选中，
        //即商品的checked或removeChecked是否为true,every方法
        selectGoods:function(shop,goods){
            let attr=this.shopEdit?'removeChecked':'checked'
            goods[attr]=!goods[attr]
        // every遍历的结果赋值给shop.checked,当每个商品都被选中时返回true，此时shop.checked或shop.removeChecked为true
            shop[attr]=shop.goodsList.every(good=>{
                return good[attr]
            })
        },
        // 每次点击店铺的时候，先确定是否是编辑状态，然后遍历店铺下的所有商品，
        //改变所有商品的checked或removeChecked状态，商品的状态与店铺的选中状态保持一致
        selectShop:function(shop){
            let attr=this.shopEdit?'removeChecked':'checked'
            shop[attr]=!shop[attr]
            shop.goodsList.forEach(goods=>{
                goods[attr]=shop[attr]
            })
        },
        
        allChecked:function(){
            let attr=this.shopEdit?'totalRemove':'totalSelector'
            this[attr]=!this[attr]
        },

        edit:function(shop,shopIndex){
            shop.editing=!shop.editing;
            //一个店铺处于编辑状态时，遍历拉取的所有数据的店铺，将其他店铺编辑状态改成false,其他店铺的编辑状态信息
            //根据当前编辑店铺的状态改变，
            this.cartList.forEach((item,i)=>{
                if(shopIndex!==i){//编辑店铺的index不等于i即其他店铺
                    item.editing=false;
                    item.editingMsg=shop.editing ? "" : "编辑";
                }
            })
            //当前被编辑的店铺来自点击当前店铺时其店铺的editing状态，如果是editing状态则店铺就是当前店铺
            this.shopEdit=shop.editing? shop: null;
            this.shopEditIndex=shop.editing? shopIndex : -1;
            shop.editingMsg=shop.editing ? "完成" : "编辑";

        },

        changeGoods:function(value,goods){
            //如果修改商品数量传入的是负值且当前商品数量已经是1时return
            if(goods.number===1&&value<0){
                return
            }
            //修改商品数量传入的是负值即减去，传入正值即加
            value>0 ? goods.number++ :goods.number--


        }
    },
    created:function(){
        this.getCartList()
    },
    mounted:function(){

    },
    mixins:[mixin]
})