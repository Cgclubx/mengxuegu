<template>
  <div>
    <el-form :inline="true" :model="query" size="mini">
      <el-form-item label="用户名:">
        <el-input v-model.trim="query.username"></el-input>
      </el-form-item>
      <el-form-item label="手机号:">
        <el-input v-model.trim="query.mobile"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="queryData"
          >查询</el-button
        >
        <el-button icon="el-icon-refresh" class="filter-item" @click="reload"
          >重置</el-button
        >
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-circle-plus-outline"
          @click="openAdd"
          >新增</el-button
        >
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column align="center" type="index" label="序号" width="80"> </el-table-column>
      <el-table-column align="center" prop="username" label="用户名" width="120"> </el-table-column>
      <el-table-column align="center" prop="nickName" label="昵称" width="100"> </el-table-column>
      <el-table-column align="center" prop="mobile" label="手机号" width="100"> </el-table-column>
      <el-table-column align="center" prop="email" label="邮箱" width="120"> </el-table-column>
      <el-table-column align="center" prop="isAccountNonLocked" label="账号过期" width="100"> </el-table-column>
      <el-table-column align="center" prop="isAccountNonExpired" label="账号锁定" width="100"> </el-table-column>
      <el-table-column align="center" prop="isCredentialsNonExpired" label="密码过期" width="100"> </el-table-column>
      <el-table-column align="center" prop="isEnabled" label="是否可用" width="100"> </el-table-column>
      <el-table-column align="center" label="操作" > 
        <el-button type="success" size="small" >编辑</el-button>
        <el-button type="danger" size="small" >删除</el-button>
        <el-button type="primary" size="small" >设置角色</el-button>
        <el-button type="primary" size="small" >密码修改</el-button>
         </el-table-column>
    </el-table>
     <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {getList} from "../../api/user"
export default {
  name: "",
  data() {
    return {
      total:null,
      tableData:[],
      pagenum:1, 
      pagesize: 10,
      query: {
        username: "",
        mobile: "",
      },
    };
  },
  computed: {},
  mounted() {
    this.getListData()
  },
  methods: {
    // 新增
    openAdd() {},
    // 查询
    queryData() {},
    // 重置
    reload() {},
    // 条数
     handleSizeChange(val) {
      this.pagesize = val;
      this.getListData();
    },
    // 页数
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getListData();
    },
    async getListData(){
       const datas = await getList(this.pagesize,this.pagenum);
       this.tableData =  datas.data.records;
       this.total = datas.data.total
    }
  },
};
</script>

<style scoped lang='scss'>
</style>
