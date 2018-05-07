import 'css/common.css';
import './index.css';
import Vue from 'vue';
import axios from 'axios';
import url from 'js/api.js';

//引入mint-ui库的加载更多组件
import {InfiniteScroll} from 'mint-ui'
Vue.use(InfiniteScroll)

//导入单页面组件Foot.vue
import foot from 'components/Foot.vue'





new Vue({
   el:"#app",
   data:{
       lists:null,
        //tips0:请求参数对应RAP接口管理平台的请求参数列表中的变量名
       pageNum:1,
       pageSize:6,
       loading:false,
       allLoaded:false
   },
   //tips0:生命周期created时调用methods定义的方法即请求数据，因为这时候已经可以拿到创建的vue实例的this了
   created(){
    this.getLists()
   },
   methods:{
       //tips1:将加载数据的过程抽象成一个方法，这样可反复调用而不用重写
       getLists:function(){
           //tips3:最后一页时return
            if(this.allLoaded){return};
            //tips2:执行getList方法时设置loading为true，即html页面ul元素中的infinite-scroll-disabled="loading"不执行方法的选项
            this.loading=true;
            
            axios.post(url.hotLists,{
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }).then(res=>{
                
                let curLists=res.data.lists;
                //tips3:当响应数据长度小于设定的每页长度时表示已经是最后一页
                if(curLists.length < this.pageSize){
                    this.allLoaded=true;
                }
                
                //tips2:数据初始化，如果为空则lists为当前响应数组，如果不为空则将原数组和响应数据数组拼接
                if(this.lists){
                    this.lists=this.lists.concat(curLists);
                    console.log(this.lists)
                }else{
                    this.lists=curLists;
                }
                
                this.loading=false;
                this.pageNum++;
                    
            })
       }
   },
   components:{
       foot:foot
   }

})