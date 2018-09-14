import SelectProxy from './SelectProxy'
import Role from '../api/role'
const RoleSelectProxy = function(param, callback, scope) {
    this.extraParam = param || null
    this.RoleProxy = new SelectProxy(Role.getUrl(), callback, scope)

    if (this.extraParam) {
        this.setParam(this.extraParam)
    }
}

RoleSelectProxy.prototype.setParam = function(param) {
    if (!param.fields) {
        param.fields = ['id', 'role_comment']
    }

    this.RoleProxy.setExtraParam(param)
    return this
}

RoleSelectProxy.prototype.load = function() {
    this.RoleProxy.load()
}

export default RoleSelectProxy
