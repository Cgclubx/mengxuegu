<template>
  <div class="navBar" style="height: 100%">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#304155"
      text-color="#fff"
      style="height: 100%"
      :router="true"
      active-text-color="#3C99FF"
      :collapse="isCollapse"
    >
      <router-link class="head-log" to="/" tag="p">
      <img
        class="logo"
        src="http://mengxuegu.com:9999/img/logo.7156be27.png"
        alt="logo"
      />
      <h4 class="title" v-if="!isCollapse">积云会员管理系统</h4>
    </router-link>
      <el-menu-item index="/dashboard">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-notebook-2"></i>
          <span>博客管理</span>
        </template>
        <el-menu-item index="/blog/article">
          <i class="el-icon-notebook-1"></i>
          <span slot="title">文章管理</span>
        </el-menu-item>
        <el-menu-item index="/blog/category">
          <i class="el-icon-s-order"></i>
          <span slot="title">分类管理</span>
        </el-menu-item>
        <el-menu-item index="/blog/label">
          <i class="el-icon-collection-tag"></i>
          <span slot="title">标签管理</span>
        </el-menu-item>
      </el-submenu>
          <el-menu-item index="/advert/index">
        <i class="el-icon-picture-outline-round"></i>
        <span slot="title">广告管理</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-notebook-2"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item index="/system/user">
          <i class="el-icon-user-solid sub-el-icon"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="/system/role">
          <i class="el-icon-coin sub-el-icon"></i>
          <span slot="title">角色管理</span>
        </el-menu-item>
        <el-menu-item index="/system/menu">
          <i class="el-icon-menu sub-el-icon"></i>
          <span slot="title">菜单管理</span>
        </el-menu-item>
      </el-submenu>
         <el-menu-item>
         <router-link to="www.usian.cn/index"></router-link>
        <i class="el-icon-link sub-el-icon"></i>
        <span slot="title">积云教育官网</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "",
  props:["isCollapse"],
  data() {
    return {
    };
  },
  mounted() {
},
  components: {},
};
</script>


<style scoped>
/* .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
} */
.el-menu {
  border-right: none;
}
.el-submenu .el-menu-item {
  background-color: #1f2d3d !important;
}
.el-submenu .el-menu-item:hover {
  background-color: #263444 !important;
}
.logo {
  vertical-align: middle;
  width: 25px;
  height: 25px;
}
.title {
  display: inline;
  text-decoration: none;
  color: #fff;
  margin-left: 5px;
}
.head-log {
  width: 100%;
  height: 60px;
  background-color: #2b2f3a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px;
  box-sizing: border-box;
}
</style>