<template>
  <div class="header" style="100%">
        <div>
          <i class="el-icon-s-fold"  v-if="isCollapse"
        @click="show(true)"></i>
        <i  v-if="!isCollapse"
        @click="show(false)" class="el-icon-s-unfold"></i>
        </div>
    <navbar style="flex:1;padding-left: 20px;"></navbar>
     <div style="margin-right:200px;">
       <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <img
          style="
            width: 40px;
            height: 40px;
            vertical-align: middle;
            cursor: pointer;
          "
          src="http://mengxuegu.com:9999/img/logo.7156be27.png"
          alt="logo"
        />
        <i
          class="el-dropdown-link el-icon-caret-bottom"
          style="margin-left: 10px; cursor: pointer"
        ></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          command="change-pass"
          @click.native="$router.push('/dashboard')"
          >home</el-dropdown-item
        >
        <el-dropdown-item command="logout">logout</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
     </div>
      
   
  </div>
</template>

<script>
import navbar from '../nav'
export default {
  name: "",
  data() {
    return {
      updatePassForm: {
        oldPass: "",
        newPass: "",
        checkNewPass: "",
      },
      isCollapse: false,
      dialogFormVisible: false,
    };
  },
  methods: {
    show(val) {
      this.isCollapse = !this.isCollapse;
      this.$emit("show", this.isCollapse);
    },
    //退出登录的方法
    logout() {},
  },
  components: {navbar},
};
</script>
<style scoped>
.header{
  position:fixed;
  z-index: 99;
  background:#fff;
  width: 80%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 30px;
}
.el-dropdown {
  float: right;
}
</style>