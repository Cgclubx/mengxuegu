<template>
  <div style="width:100%;">
    <el-form :inline="true" ref="query" :model="query" size="mini">
      <el-form-item label="文章标题:">
        <el-input v-model.trim="query.title" prop="title"></el-input>
      </el-form-item>
      <el-form-item label="状态:">
        <el-select
          prop="status"
          v-model="query.status"
          clearable
          filterable
          style="width: 100px"
        >
          <el-option :value="1" label="未审核"></el-option>
          <el-option :value="2" label="审核通过"></el-option>
          <el-option :value="3" label="审核未通过"></el-option>
          <el-option :value="0" label="已删除"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          icon="el-icon-search"
          type="primary"
          @click="getArticleById()"
          >查询</el-button
        >
        <el-button
          icon="el-icon-refresh"
          class="filter-item"
          @click="reload('query')"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-table :data="tableData" style="width: 100%" >
      <el-table-column
        prop="date"
        align="center"
        label="序号"
        type="index"
        width="150"
      >
      </el-table-column>
      <el-table-column align="center" prop="title" label="文章标题" width="150">
      </el-table-column>
      <el-table-column align="center" prop="thumhup" label="浏览量" width="150">
      </el-table-column>
      <el-table-column
        align="center"
        prop="viewCount"
        label="点赞数"
        width="150"
      >
      </el-table-column>
      <el-table-column align="center" label="是否公开">
        <el-table-column
          align="center"
          prop="ispublic"
          label="是否公开"
          width="120"
        >
          <template slot-scope="scope">
            <el-tag type="warning" v-if="scope.row.ispublic == 0">公开</el-tag>
            <el-tag type="danger" v-if="scope.row.ispublic == 1">不公开</el-tag>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" prop="status" label="状态 " width="120">
        <template slot-scope="scope">
          <el-tag type="primary" v-if="scope.row.status == 0">未审核</el-tag>
          <el-tag type="success" v-if="scope.row.status == 1">审核通过</el-tag>
          <el-tag type="danger" v-if="scope.row.status == 2">删除</el-tag>
          <el-tag type="warning" v-if="scope.row.status == 3"
            >审核未通过</el-tag
          >
        </template>
      </el-table-column>

      <el-table-column align="center" label="最后更新时间">
        <el-table-column
          prop="updateDate"
          align="center"
          label="最后更新时间"
          width="130"
        >
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" prop="date" label="操作" width="320">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="openView(scope.row.id)">查看</el-button>
          <el-button
            type="success"
            size="small"
            @click="openAudit(scope.row.id)"
            >审核</el-button
          >
          <el-button type="danger" size="small" @click="dele(scope.row.id)"
            >删除</el-button
          >
          <!-- 查看 -->
          <audit
            :id="audit.id"
            :isAudit="audit.isAudit"
            :title="audit.title"
            :visible="audit.visible"
            :formData="formData"
            :remoteClose="remoteClose"
          ></audit>
        </template>
      </el-table-column>
    </el-table>
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
import audit from "./audit";
import article from "../../api/article";
export default {
  name: "",
  data() {
    return {
      audit: {
        id: null,
        isAudit: true,
        visible: false,
        title: "",
      },
      formData: {},
      pagesize: 10,
      pagenum: 1,
      tableData: [],
      total: null,
      query: {
        title: "",
        status: "",
      },
    };
  },
  computed: {},
  components: { audit },
  methods: {
    openView(id) {
      this.getArticleById(id);
      this.audit.id = id;
      this.audit.isAudit = false;
      this.audit.title = "文章详情";
      this.audit.visible = true;
    },
    // 查询文章详情
    getArticleById(id) {
      article.getById(id).then((response) => {
        this.formData = response.data;
      });
    },
    // 打开审核窗口
    openAudit(id) {
      this.getArticleById(id);
      this.audit.id = id; // 文章id
      this.audit.isAudit = true; // 审核页面
      this.audit.title = "审核文章";
      this.audit.visible = true;
    },
    // 关闭子组件弹出窗口
    remoteClose() {
      this.audit.visible = false;
      this.getList();
    },
    // 查询
    queryData() {
      this.pagenum = 1;
      this.getList();
    },
    // 重置
    reload(formName) {
      this[formName] = {};
      this.getList();
    },
    // 删除
    dele(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let datas = await article.deleteById(id);
          console.log(datas);
          if (datas.code === 20000) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          } else {
            this.$message({
              type: "error",
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
    // 获取数据
    async getList() {
      let datas = await article.getList(this.pagenum, this.pagesize);
      this.tableData = datas.data.records;
      this.total = datas.data.total;
    },
    // 条数
    handleSizeChange(val) {
      this.pagesize = val;
      this.getList();
    },
    // 页数
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getList();
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style scoped lang='scss'>
</style>
