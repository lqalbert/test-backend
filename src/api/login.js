import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/get-details',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
