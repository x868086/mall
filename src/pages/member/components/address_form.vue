<template>
    <div class="container " style="min-height: 597px;">
    <div class="section section-first">
      <div class="block form js-form">
        <input class="js-id" name="id" type="hidden" value="69150287">
        <div class="block-item" style="border-top:0;">
          <label>收货人</label>
          <input type="text" placeholder="请输入姓名" v-model.trim="name" maxlength="20">
        </div>
        <div class="block-item">
          <label>联系电话</label>
          <input type="tel" placeholder="联系电话" v-model.trim="tel" maxlength="11">
        </div>
        <div class="block-item">
          <label>选择地区</label>
          <div class="select-group">
            <select class="js-province-selector" v-model="provinceValue">
              <option value="-1">选择省份</option>
              <option v-bind:value="pro.value" 
              v-for="pro in addressData" 
              v-bind:key="pro.value"
              >{{pro.label}}</option>
            </select>
            <select class="js-city-selector" v-model="cityValue">
              <option value="-1">选择城市</option>
              <option v-bind:value="c.value"
              v-for="c in cityList"
              v-bind:key="c.value">{{c.label}}</option>
            </select>
            <select class="js-county-selector" name="area_code" data-code="440402"
            v-model="districtValue">
              <option value="-1">选择地区</option>
              <option
              v-for="d in districtList" 
              v-bind:key="d.value"
              v-bind:value="d.value"
              >{{d.label}}</option>
            </select>
          </div>
        </div>
        <div class="block-item">
          <label>详细地址</label>
          <input type="text" placeholder="街道门牌信息" name="address_detail"  
          v-model.trim="address" maxlength="100">
        </div>
      </div>
    </div>
    <div class="block section js-save block-control-btn"
    v-on:click="add">
      <div class="block-item c-blue center">保存</div>
    </div>
    <div class="block section js-delete block-control-btn" v-show="type==='edit'"
    v-on:click="remove">
      <div class="block-item c-red center">删除</div>
    </div>
    <div class="block stick-bottom-row center js-save-default" v-show="type==='edit'"
    v-on:click="setDefault">
      <button class="btn btn-standard js-save-default-btn">设为默认收货地址</button>
    </div>
  </div>
</template>

<script>
import addressData from 'js/address.json';
// import addressService from 'js/addressService.js';

export default {
  data:function(){
    return {
      name: "",
      tel:"",
      provinceName:"",
      provinceValue: -1,
      address: "",
      cityName:"",
      cityValue: -1,
      districtName:"",
      districtValue: -1,
      type:null,
      addressData:addressData.list,
      cityList:null,
      districtList:null,
      instance:null,
      id:""
    }
  },

  computed:{
    lists:function(){
      return this.$store.state.lists
    }
  },
  
  created:function(){
    //组件在路由视图加载时执行，取all页面编辑模式传出的编辑对象list
    this.type=this.$route.query.type;   //当加载当前页面后从路由对象获取当前页面的查询字符串，以此区别是edit还是add
    this.instance=this.$route.query.list; //加载当前页面后从路由对象获取当前页面的查询字符串中的list对象
    if(this.type==='edit'){
      let data=this.instance
      this.name=data.name;
      this.tel=data.tel;
      this.address=data.address;
      this.id=data.id;
      this.cityList=data.cityList;
      this.cityName=data.cityName;
      this.districtName=data.districtName;
      this.provinceName=data.provinceName;
      this.provinceValue=parseInt(data.provinceValue);
      this.cityValue=parseInt(data.cityValue);
      this.districtValue=parseInt(data.districtValue);
    }
  },
  
  watch:{
    // lists:function(){
    //   this.$router.push({name:'alladdress'})
    // },
    //深度监听
    lists:{
      deep:true,
      handler:function(){
        this.$router.push({name:'alladdress'})
      }
    },
    //监测省编码变化，如变化取到市列表
    provinceValue:function(val){
      if(val === -1){
        return
      }

      let list=this.addressData;
      let index=list.findIndex(item=>{
          return item.value === val
      })
      this.cityList = list[index].children;
      //取到市列表后将，市、区下拉列表还原成初始值
      this.provinceName=list[index].label
      this.cityValue = -1;
      this.districtValue = -1;
      // if(this.type==='edit'){
      //   this.cityValue=parseInt(this.instance.cityValue);
      // }

    },

    //监测市编码变化，如变化取到区列表
    cityValue:function(val){
      if(val === -1){
        return
      }

      let list=this.cityList;
      let index=list.findIndex(item=>{
          return item.value === val
      })
      this.districtList = list[index].children;
      //获取到区列表后，将区下拉列表还原成初始值
      this.cityName=list[index].label;
      this.districtValue = -1;
      
      // if(this.type==='edit'){
      //   this.districtValue=parseInt(this.instance.districtValue);
      // }

    },

    districtValue:function(val){
      if(val === -1){
        return
      }

      let list=this.districtList;
      let index=list.findIndex(item=>{
          return item.value === val;
      })
      this.districtName=list[index].label;
    }
  },
  methods:{
    add:function(){
          //Vue 实例也代理 data 对象上所有的属性，因此访问 this.a 等价于访问 this.$data.a
          let {name,tel,provinceValue,cityValue,districtValue,
          address,id,provinceName,cityName,districtName} =this.$data;
          let data={name,tel,provinceValue,cityValue,districtValue,
          address,id,provinceName,cityName,districtName};
      if(this.type==='add'){
          this.$store.dispatch("addAction",data)
      }

      if(this.type==='edit'){
        this.$store.dispatch("updateAction",data)
      }
    },

    remove:function(){
      if(window.confirm("确认删除地址?")){
        this.$store.dispatch("removeAction",this.$data.id)
      }
    },

    setDefault:function(){
      this.$store.dispatch("setDefaultAction",this.$data.id)
    }
  }
}
</script>



