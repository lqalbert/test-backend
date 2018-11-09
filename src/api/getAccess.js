import request from '@/utils/request'
import APP_CONST from '../config/index';

export function getAccess() {
    return request({
        url: APP_CONST.BASE_URL + '/admin/role/index',
        method: 'get',
    })


}

