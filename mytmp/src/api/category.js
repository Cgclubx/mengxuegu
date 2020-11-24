import request from '@/utils/request'
export default {
  // 分页条件查询分类列表
  getList(query, current, size) {
    return request({ // Promise
      url: `/article/category/search`,
      method: 'post',
      data: { // {name: '前端', status: 1, current: current, size: size}
        ...query,
        current,
        size
      }
    })
  },
  // 新增接口
  add(data) {
    return request({
      url: `/article/category`,
      method: 'post',
      data
    })
  },
  // 查询
  getById(id) {
    return request({
      url: `/article/category/${id}`, // 反单引号 ``
      method: 'get'
    })
  },
  // 更新
  update(data) {
    return request({
      url: `/article/category`,
      method: 'put', // put 方式提交
      data,
    })
  },
  // 删除
  deleteById(id) {
    return request({
      url: `/article/category/${id}`, // 反单引号 ``
      method: 'delete', // delete 方式提交
    })
  },
  //获取所有正常状态的分类
 getNormalList() {
  return request({
  url: `/article/category/list`, 
  method: 'get'
  })
  }



}
