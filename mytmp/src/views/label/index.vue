<template>
  <div>
    <div class="app-container">
      <el-form :inline="true" :model="query" size="mini">
        <el-form-item label="标签名称:">
          <el-input v-model.trim="query.name"></el-input>
        </el-form-item>
        <el-form-item label="分类名称:">
          <el-select
            v-model="query.status"
            clearable
            filterable
            style="width: 85px"
          >
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.categoryName"
              :value="item.id"
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
      <el-table :data="list" border highlight-current-row style="width: 100%">
        <el-table-column align="center" type="index" label="序号" width="60">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="标签名称"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="categoryName"
          label="分类名称"
        ></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.current"
        :page-sizes="[10, 20, 50]"
        :page-size="page.size"
        :total="page.total"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>
    <edit
      :categoryList="categoryList"
      :title="edit.title"
      :visible="edit.visible"
      :formData="edit.formData"
      :remoteClose="remoteClose"
    >
    </edit>
  </div>
</template>

<script>
import Edit from "./edit";
import categoryApi from "@/api/category";
import api from "@/api/label";
export default {
  name: "",
  data() {
    return {
      edit: {
        // 子组件中引用
        title: "",
        visible: false,
        formData: {},
      },
      categoryList: [], // 数组存储正常状态的分类
      list: [],
      page: {
        // 分页相关
        total: 0, // 总记录数
        current: 1, // 当前页码
        size: 20, // 每页显示20条数据,
      },
      query: {
        status: "",
      }, // 查询条件
    };
  },
  computed: {},
  mounted() {
    this.fetchData();
    this.getCategoryList();
  },
  methods: {
    // 删除
    handleDelete(id) {
      this.$confirm("确认删除这条记录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 确认
          api.deleteById(id).then((response) => {
            //提示信息
            this.$message({
              type: response.code === 20000 ? "success" : "error",
              message: response.message,
            });
            // 刷新列表
            this.fetchData();
          });
        })
        .catch(() => {
          // 取消删除，不理会
        });
    },
    //  查询
    handleEdit(id) {
      api.getById(id).then((response) => {
        if (response.code === 20000) {
          this.edit.formData = response.data;
          //弹出窗口
          this.edit.visible = true;
          this.edit.title = "编辑";
        }
      });
    },
    // 触发关闭弹出的新增修改子组件窗口
    remoteClose() {
      // 一定要加上这个，不然有时候表单输入不了值
      this.edit.formData = {};
      this.edit.visible = false;
      this.fetchData();
    },
    //打开新增窗口
    openAdd() {
      // 打开时，重新查询正常状态的分类数据
      this.getCategoryList();
      this.edit.visible = true;
      this.edit.title = "新增";
    },
    // 重置 or 刷新当前页面
    reload() {
      this.query = {};
      this.fetchData();
    },
    // 查询
    queryData() {
      // 将页码变为第1页
      this.page.current = 1;
      this.fetchData();
    },
    // 获取所有状态为正常的分类，用于条件查询中
    getCategoryList() {
      categoryApi.getNormalList().then((response) => {
        this.categoryList = response.data;
      });
    },
    //  页数
    handleSizeChange(val) {
      this.page.size = val;
      this.fetchData();
    },
    // 条数
    handleCurrentChange(val) {
      this.page.current = val;
      this.fetchData();
    },
    // 获取数据
    fetchData() {
      api
        .getList(this.query, this.page.current, this.page.size)
        .then((response) => {
          this.list = response.data.records;
          this.page.total = response.data.total;
        });
    },
  },
  components: { Edit },
};
</script>

<style scoped lang='scss'>
</style>
