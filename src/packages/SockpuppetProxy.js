import SelectProxy from './SelectProxy'
import Sockpuppet from '../api/sockpuppet'
const SockpuppetSelectProxy = function(param, callback, scope) {
    this.extraParam = param || null
    this.SockpuppetProxy = new SelectProxy(Sockpuppet.getUrl(), callback, scope)

    if (this.extraParam) {
        this.setParam(this.extraParam)
    }
}

SockpuppetSelectProxy.prototype.setParam = function(param) {
    if (!param.fields) {
        param.fields = ['id', 'type_name']
    }

    this.SockpuppetProxy.setExtraParam(param)
    return this
}

SockpuppetSelectProxy.prototype.load = function() {
    this.SockpuppetProxy.load()
}

export default SockpuppetSelectProxy
