<template>
      <div class="container " style="min-height: 581px;">
    <div class="content">
      <div class="user-infos">
        <div class="pull-left avatar">
          <div class="img" style="background-image: url(https://img.yzcdn.cn/upload_files/no_pic.png?imageView2/2/w/280/h/280/q/75/format/webp);"></div>
        </div>
        <div class="pull-left desc">
          <p>tiger</p>
        </div>
      </div>
      <div class="order-related">

        <div class="block block-list list-vertical">
          <router-link to="/address" class="block-item link clearfix ico-setting js-login" target="_self">
            <!-- <a class="block-item link clearfix ico-setting js-login" target="_self"> -->
              <p class="title-info c-black font-size-14">收货地址管理</p>
            <!-- </a> -->
          </router-link>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>


<style scoped>
    @import './member_base.css';
    @import './member.css';
</style>

