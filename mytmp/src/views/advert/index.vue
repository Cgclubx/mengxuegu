<template>
  <div>
    <el-form :inline="true" :model="query" size="mini">
      <el-form-item label="广告标题:">
        <el-input v-model.trim="query.name"></el-input>
      </el-form-item>
      <el-form-item label="状态:">
        <el-select
          v-model="query.status"
          clearable
          filterable
          style="width: 85px"
        >
          <el-option
            v-for="item in statusOptions"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
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
      <el-table-column align="center" type="index" label="序号" width="80">
      </el-table-column>
      <el-table-column align="center" prop="title" label="广告标题" width="180">
      </el-table-column>
      <el-table-column align="center" label="广告图片" width="180">
        <template slot-scope="scope">
          <img :src="scope.row.imageUrl" />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="advertUrl"
        label="广告链接"
        width="180"
      >
      </el-table-column>
      <el-table-column align="center" label="状态" width="180">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 0" type="success">正常</el-tag>
          <el-tag v-if="scope.row.status == 1" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="sort" label="排序" width="180">
      </el-table-column>
      <el-table-column align="center" prop="" label="操作">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            @click="handleEdit(scope.row.id)"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            size="mini"
            @click="handleDelete(scope.row.id)"
          >
            删除
          </el-button>
        </template>
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
import advert from "../../api/advert";
const statusOptions = [
  { code: 0, name: "禁用" },
  { code: 1, name: "正常" },
];
export default {
  name: "Advert",
  data() {
    return {
      statusOptions,
      total: null,
      pagenum: 1,
      pagesize: 10,
      query: {
        status: null,
        name: null,
      },
      tableData: [],
    };
  },
  computed: {},
  mounted() {
    this.getListData();
  },
  methods: {
    //   编辑
    handleEdit(id) {},
    //   删除
    handleDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const datas = await advert.deleteById(id);
          console.log(datas);
          if (datas.code === 20000) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getListData();
          } else {
            this.$message({
              type: "success",
              message: "删除失败!",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //   请求列表数据
    async getListData() {
      const datas = await advert.getList(this.pagenum, this.pagesize);
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
};
</script>

<style scoped lang='scss'>
img {
  width: 60px;
  height: 60px;
}
</style>
