<template>
  <div style="height:100%">
    <el-container >
      <el-aside  width="null">
        <!-- 侧边栏 -->
        <Navbar style="height:100%;" :isCollapse="isCollapse"></Navbar>
      </el-aside>
      <el-main style="width:100%">
        <Header @show="show" style="width:100%;"></Header>
        <!-- 右侧主体内容 -->
        <Main style="width:100%;padding:70px 20px 0px 20px;box-sizing:border-box;"></Main>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from "./Header";
import Navbar from "./Navbar";
import Main from "./Main";
export default {
  name: "",
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    show(val) {
      this.isCollapse = val;
    },
  },
  components: {
    Header,
    Navbar,
    Main,
  },
};
</script>
<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
}
.navBar {
  background-color: #304155;
}
.header {
  float: left;
  height: 60px;
  line-height: 60px;
  background-color: #fff;
  z-index: 9999;
}
.el-main{
  width: 80%;
  height: 100%;
  padding: 0;
}
.el-container{
  height: 100%;
}
/* .main {
  float: left;
  background-color: #fff;
  overflow: auto;
} */
/* .router-link-active {
  text-decoration: none;
  color: #ffd04b;
}
a {
  text-decoration: none;
  color: black;
} */
</style>
