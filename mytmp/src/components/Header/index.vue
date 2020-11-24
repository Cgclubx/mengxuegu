<template>
  <div class="header">
    <router-link to="/">
      <img
        class="logo"
        src="http://mengxuegu.com:9999/img/logo.7156be27.png"
        alt="logo"
      />
      <h3 class="title">积云会员管理系统</h3>
    </router-link>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
       <img
         style="width:40px;height:40px; vertical-align: middle;"
        src="http://mengxuegu.com:9999/img/logo.7156be27.png"
        alt="logo"
      />
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="change-pass" 
        @click.native="$router.push('/dashboard')"
          >home</el-dropdown-item
        >
        <el-dropdown-item command="logout" 
          >logout</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      updatePassForm: {
        oldPass : "",
        newPass : "",
        checkNewPass : ""
      },
      dialogFormVisible: false
    };
  },
  methods: {
    //退出登录的方法
    async logout() {
        this.$router.push("/login");
    //   const res = await this.$store.dispatch("UserLogout");
    //   if (res) {
    //     //回到登录页面
    //     this.$router.push("/login");
    //   } else {
    //         this.$message.error("修改密码失败")
    //   }
    }
  },
  components: {}
};
</script>


<style scoped>
.header {
  padding: 0 40px;
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
  position: relative;
  top: 1px;
}
.el-dropdown {
  float: right;
  color: #fff;
}
</style>