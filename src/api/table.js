import request from '@/utils/request'

export function getData(url, perpages, nowpage, form) {
  return request({
    url: url,
    method: 'get',
    data: {
      perpages,
      nowpage,
      form
    }
  })
}
export function handleDelete(url, ids) {
  return request({
    url: url,
    method: 'delete',
    data: {
      ids
    }
  })
}
