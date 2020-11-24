import request from "@/utils/request"
export default {
  // 文章列表分页接口
  getList(query, current = 1, size = 20) {
    return request({
      url: `/article/article/search`,
      method: 'post',
      data: {
        ...query,
        current,
        size
      } // 合并成一个对象
    })
  },
  // 查询
  getById(id) {
    return request({
      url: `/article/article/${id}`, // 反单引号 ``
      method: 'get'
    })
  },
  //获取所有正常状态的分类和标签
  getCategoryAndLabel() {
    return request({
      url: `/article/category/label/list`,
      method: 'get'
    })
  },
  // 审核通过
  auditSuccess(id) {
    return request({
      url: `/article/article/audit/success/${id}`, // 反单引号 ``
      method: 'get',
    })
  },
  // 审核不通过
  auditFail(id) {
    return request({
      url: `/article/article/audit/fail/${id}`, // 反单引号 ``
      method: 'get',
    })
  },
//   删除
  deleteById(id) {
    return request({
    url: `/article/article/${id}`, // 反单引号 ``
    method: 'delete', // delete 方式提交
    })
    }
}
