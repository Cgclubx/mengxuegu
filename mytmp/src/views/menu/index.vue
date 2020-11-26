<template>
  <div>
       <el-form :inline="true" :model="query" size="mini">
      <el-form-item label="菜单名称:">
        <el-input v-model.trim="query.username"></el-input>
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
export default {
  name: '',
  data() {
    return {
        query: { username: "" },
      total: null,
      pagenum: 1,
      pagesize: 10,
      tableData: [],
    };
  },
  computed:{
  },
  methods: {
     //   请求列表数据
    async getListData() {
      const datas = await role.getList(this.pagenum, this.pagesize);
      this.tableData = datas.data.records;
      this.total = datas.data.total;
    },
    // 查询
    queryData() {},
    // 重置
    reload() {},
    // 新增
    openAdd() {},
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
  },
    mounted() {
    this.getListData()
  }
};
</script>

<style scoped lang='scss'>

</style>
