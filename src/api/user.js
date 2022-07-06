import {request} from '@/utils/request/request'

export function login(data) {
  return request('/user/login', {
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request('/user/info',{
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request('/user/logout',{
    method: 'post'
  })
}
