<template>
  <div>
    <el-form :inline="true" :model="query" size="mini">
      <el-form-item label="角色名称:">
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

    <el-table
    border
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column align="center" label="序号" type="index" > </el-table-column>
      <el-table-column align="center" prop="name" label="角色名称" >
      </el-table-column>
      <el-table-column align="center" prop="remark" label="备注" >
      </el-table-column>
      <el-table-column align="center" label="操作" show-overflow-tooltip>
        <el-button type="primary" size="small">分配权限</el-button>
        <el-button type="success" size="small">编辑</el-button>
        <el-button type="danger" size="small">删除</el-button>
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
import role from "../../api/role";
export default {
  name: "",
  data() {
    return {
      query: { username: "" },
      total: null,
      pagenum: 1,
      pagesize: 10,
      tableData: [],
    };
  },
  computed: {},
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
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
