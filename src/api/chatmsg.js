import RestfulProxy from './RestfulProxy';

const URL = '/chatmsg';
const proxy = new RestfulProxy(URL);


proxy.exportxls = function(param){
    return this.getAxios().get(this.url + '-exportxls', param)
}

export default proxy;


