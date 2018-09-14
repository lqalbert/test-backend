import request from '@/utils/request'


export function create(formData) {
    return request({
        url: '/studios/create',
        method: 'post',
        data: formData
    })
}
export function show() {
    return request({
        url: '/studios/show',
        method: 'post',
    })
}

export function findOne(rid) {
    return request({
        url: '/studios/one',
        method: 'post',
        data: {
            rid
        }
    })
}


