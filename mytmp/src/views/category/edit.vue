<template>
  <div>
      <!--弹窗-->
      <el-dialog
        :title="title"
        :visible.sync="visible"
        :before-close="handleClose"
        width="500px"
      >
        <!-- status-icon 当表单校验不通过时, 输入框右侧有个 x 小图标 -->
        <el-form
          :rules="rules"
          status-icon
          ref="formData"
          :model="formData"
          label-width="100px"
          label-position="right"
          style="width: 400px"
        >
          <el-form-item label="分类名称:" prop="name">
            <el-input v-model="formData.name" />
          </el-form-item>
          <el-form-item label="状态:" prop="status">
            <el-radio-group v-model="formData.status">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="排序:" prop="sort">
            <el-input-number
              style="width: 300px"
              v-model="formData.sort"
              :min="1"
              :max="10000"
            />
          </el-form-item>
          <el-form-item label="备注:" prop="remark">
            <el-input
              v-model="formData.remark"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入备注"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('formData')"
              size="mini"
            >
              确定</el-button
            >
            <el-button size="mini" @click="handleClose">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
  </div>
</template>

<script>
import api  from '@/api/category'
export default {
  name: "",
  props: {
    visible: {
      //弹出隐藏
      type: Boolean,
      default: false,
    },
    title: {
      // 标题
      type: String,
      default: "",
    },
    formData: {
        id:'',
      // 表单数据
      type: Object,
      default: {},
    },
    remoteClose: Function, // 用于关闭窗口
  },
  data() {
    return {
      rules: {
        // 校验规则
        name: [
          // 与 el-form-item 标签的 prop 属性值对应
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
        sort: [{ required: true, message: "请输入排序号", trigger: "change" }],
      },
    };
  },
  computed: {},
  methods: {
    // 关闭弹窗
    handleClose(done) {
      // 表单清空
      this.$refs["formData"].resetFields();
      // this.visible // 错误的，因为它是父组件传递过来的，子组件不能直接改
      // 因为 visible 是父组件的属性，所以要让父组件去改变值
      this.remoteClose();
    },
    //提交表单
    submitForm(formName) {
        this.$refs[formName].validate((valid)=>{
            if(valid){
                this.submitData()
            }else{
                return false
            }
        })
    },
   async submitData(){
    //    判断是否传来id
       let response = null;
       if(this.formData.id){
           response = await api.update(this.formData)
       }else{
           response = await api.add(this.formData)
       }
       if(response.code == 20000){
           this.$message.success(response.message);
           this.handleClose()
       }else{
           this.$message.error(response.message)
       }
    }
  }
};
</script>

<style scoped lang='scss'>
</style>
