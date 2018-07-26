<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swp-page swiper-slide" v-for="(list,idx) in lists">
                <a class="js-no-follow" v-bind:href="list.clickUrl">
                    <img class="goods-main-photo fadeIn" v-bind:src="list.img">
                </a>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';

export default {
    name:'swipe',
    props:{
        lists:{
            type:Array,
            required:true
        }
    },

    methods:{
        //定义轮播初始化的js逻辑,参考swipe官方文档
    init() {
      new Swiper('.swiper-container', {
        loop: true,
        pagination: {
            el:'.swiper-pagination'
        }
      })
    }
    },
       mounted(){
        this.init() 
           //初始条件lists为null，无法渲染dom
    console.log('mounted: ' ,document.querySelectorAll('.js-no-follow'))
   },


        //updated阶段可拿到DOM,因为异步数据变化会触发updated钩子函数，在这个阶段能拿到数据更新后的DOM，所以可以执行init()初始化轮播js逻辑
        updated(){
    console.log('updated: ' ,document.querySelectorAll('.js-no-follow')) 
        //任意数据更新后，都会经过updated
        // this.init() 
   },

   watch:{
       lists(val,oval){
           //watch lists变化后，无法立即获取数据变化后的DOM
           console.log('watch: ' ,document.querySelectorAll('.js-no-follow'))
           //watch lists变化后在下一轮事件队列中可获取到数据变化后的DOM
           this.$nextTick(function(){
              console.log('next: ' ,document.querySelectorAll('.js-no-follow')) 
              //watch检测单个属性更新后可用$nextTick()立即渲染DOM
            //   this.init() 
           })
       }
   },



};
</script>


<style>
.swiper-slide img {
  width: 100%;
  height: 100%;
}
</style>


