import SelectProxy from './SelectProxy'
import Menu from '../api/menu'
const MenuSelectProxy = function(param, callback, scope) {
    this.extraParam = param || null
    this.MenuProxy = new SelectProxy(Menu.getUrl(), callback, scope)

    if (this.extraParam) {
        this.setParam(this.extraParam)
    }
}

MenuSelectProxy.prototype.setParam = function(param) {
    if (!param.fields) {
        param.fields = ['id', 'name']
    }

    this.MenuProxy.setExtraParam(param)
    return this
}

MenuSelectProxy.prototype.load = function() {
    this.MenuProxy.load()
}

export default MenuSelectProxy
