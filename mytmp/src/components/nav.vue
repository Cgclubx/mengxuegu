<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-if="$route.path!='/dashboard'" to="">{{$route.meta.names}}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="$route.path!='/dashboard'" to="">{{$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style scoped lang='scss'>
</style>
