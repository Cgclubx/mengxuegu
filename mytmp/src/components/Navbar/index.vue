<template>
  <div class="navBar">
    <el-menu
      theme="dark"
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      :router="true"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/dashboard">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>博客管理</span>
        </template>
        <el-menu-item index="/blog/article">
          <i class="el-icon-user-solid"></i>
          <span slot="title">文章管理</span>
        </el-menu-item>
        <el-menu-item index="/blog/category">
          <i class="el-icon-s-cooperation"></i>
          <span slot="title">分类管理</span>
        </el-menu-item>
        <el-menu-item index="/blog/label">
          <i class="el-icon-s-goods"></i>
          <span slot="title">标签管理</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  components: {},
};
</script>


<style scoped>
.el-menu {
  border-right: none;
}
</style>