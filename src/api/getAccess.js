import request from '@/utils/request'
import APP_CONST from '../config/index'

export function getAccess(token) {
    return request({
        url: APP_CONST.BASE_URL + '/admin/role/index',
        method: 'get',
        params: { token }
    })

}


/*import RestfulProxy from './RestfulProxy';

const URL = '/role';
const proxy = new RestfulProxy(URL);

export default proxy;*/


