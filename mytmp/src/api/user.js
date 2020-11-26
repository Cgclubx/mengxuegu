import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
// 条件分页查询用户列表
export function getList(query, current, size) {
  return request({
    url: `/system/user/search`,
    method: 'post',
    data: {
      ...query,
      current,
      size
    }
  })
}
// 新增用户
export function add(data) {
  return request({
    url: `/system/user`,
    method: 'post',
    data
  })
}
// 查询
export function getById(id) {
  return request({
    url: `/system/user/${id}`, // 反单引号 ``
    method: 'get'
  })
}
// 更新
export function update(data) {
  return request({
    url: `/system/user`,
    method: 'put', // put 方式提交
    data,
  })
}
// 删除
export function deleteById(id) {
  return request({
    url: `/system/user/${id}`, // 反单引号 ``
    method: 'delete', // delete 方式提交
  })
}
// 查询用户拥有角色ids
export function getRoleIdsByUserId(id) {
  return request({
    url: `/system/user/${id}/role/ids`, // 反单引号 ``
    method: 'get'
  })
}
// 保存用户拥有角色
export function saveUserRole(id, roleIds) {
  return request({
    url: `/system/user/${id}/role/save`,
    method: 'post',
    data: roleIds
  })
}
// 提交修改新密码
export function updatePassword(data) {
  return request({
    url: `/system/user/password`,
    method: 'put',
    data
  })
}
