<template>
<div>
<body class="container-bottom-menu" style="cursor:pointer;">
  <div class="container " style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block"
      v-if="lists&&lists.length">
      <a class="block-item js-address-item address-item" 
      v-for="list in lists"
      v-bind:key="list.id"
      v-bind:class="{'address-item-default':list.isDefault}">
        <div class="address-title">{{`${list.name} ${list.tel}`}}</div>
        <p>{{`${list.provinceName}${list.cityName}${list.districtName}${list.address}`}}</p>
        <a class="address-edit" 
        v-on:click="addEdit(list)">修改</a>
      </a>
      <!-- <a class="block-item js-address-item address-item address-item-default">
        <div class="address-title">tiger2 18600000001</div>
        <p>北京市北京市东城区</p>
        <a class="address-edit"
        v-on:click="addEdit">修改</a>
      </a> -->
    </div>
    <div class="block stick-bottom-row center">
            <router-link class="btn btn-blue js-no-webview-block js-add-address-btn"
            v-bind:to="{name:'formaddress',query:{type:'add'}}">
                新增地址
            </router-link>
    </div>
  </div>
</body>
</div>

</template>

<script>
  import AddressService from 'js/addressService.js';

export default {
  data:function(){
    return {
      lists:null
    }
  },
  created:function(){
    this.getList()
  },
    methods:{
        addEdit:function(list){
            // this.$router.push({path:'/address/form'})
            this.$router.push({name:'formaddress',query:{
              type:'edit',
              list:list//点击编辑时传递查询字符串，在查询字符串中传递当前编辑的list
            }})
        },
        getList:function(){
          AddressService.getlist().then(res=>{
            this.lists=res.data.lists
          })
        }

    }
}
</script>







