<template>
  <div>
    <router-view></router-view>
  </div>
</template>


<style scoped>
/* router-view出口下有address_all和address_form两个页面，所以在本页面导入css两个页面的css都可以生效 */
    @import './address_base.css';
    @import './address.css';
</style>