import request from '@/utils/request'

export function findOne(table,id) {
    return request({
        url: '/'+table+'/one',
        method: 'post',
        data: {
          id
        }
    })
}