<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      :before-close="handleClose"
      width="70%"
    >
      <!-- status-icon 当表单校验不通过时, 输入框右侧有个 x 小图标 -->
      <el-form label-width="100px" label-position="right">
        <el-form-item label="标题:">
          <el-input v-model="formData.title" readonly />
        </el-form-item>
        <el-form-item label="标签:">
          <div v-html="formData.mdContent"></div>
        </el-form-item>
        <el-form-item label="主图:">
          <img
            :src="formData.imageUrl"
            class="avatar"
            style="width: 178px; heigth: 178px; display: block"
          />
        </el-form-item>

        <el-form-item label="是否公开:">
          <el-radio-group v-model="formData.ispublic" disabled>
            <el-radio :label="0">不公开 </el-radio>
            <el-radio :label="1">公开 </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="简介:">
          <el-input
            v-model="formData.summary"
            type="textarea"
            :autosize="{ minRows: 2 }"
            readonly
          />
        </el-form-item>
              <el-form>
      <el-form-item label="内容:">
        <!-- 3. 主体内容 :editable="false" 禁止编辑-->
        <mavon-editor ref="md" :editable="true"  />
      </el-form-item>
    </el-form>
        <el-form-item align="center" v-if="isAudit">
          <el-button @click="auditSuccess()" type="primary">审核通过</el-button>
          <el-button @click="auditFail()" type="danger">审核不通过</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import api from "@/api/article"
import categoryApi from "@/api/category";
export default {
  name: "",
  // 接收父组件传递的属性
  props: {
    id: null, // 文章id
    isAudit: true, // 是否为审核页面，false 为详情页
    visible: {
      //弹出隐藏
      type: Boolean,
      default: false,
    },
    formData: {
      type: Object,
    },
    title: {
      // 标题
      type: String,
      default: "",
    },
    remoteClose: Function,
  }, // 用于关闭窗口
  data() {
    return {
      labelOptions: [], // 所有标签数组
      // formData: {}, // 表单数据
    };
  },
  computed: {},
  components:{ mavonEditor},
  methods: {
    // 获取所有分类与标签
    getLabelOptions() {
      categoryApi.getCategoryAndLabel().then((response) => {
        this.labelOptions = response.data;
      });
    },
    // 审核通过
    auditSuccess() {
      this.$confirm("确认审核通过吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 确认
          api.auditSuccess(this.id).then((response) => {
            //提示信息
            this.$message({
              type: "success",
              message: "审核通过提交成功",
            });
            // 关闭窗口
            this.remoteClose();
          });
        })
        .catch(() => {
          // 取消删除，不理会
        });
    },
    // 审核不通过
    auditFail() {
      this.$confirm("确认审核不通过吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 确认
          api.auditFail(this.id).then((response) => {
            //提示信息
            this.$message({
              type: "success",
              message: "审核不通过提交成功",
            });
            // 关闭窗口
            this.remoteClose();
          });
        })
        .catch(() => {
          // 取消删除，不理会
        });
    },
    // 关闭弹窗
    handleClose() {
      // 因为 visible 是父组件的属性，所以要让父组件去改变值
      this.remoteClose();
    },
  },
};
</script>

<style scoped lang='scss'>
</style>
