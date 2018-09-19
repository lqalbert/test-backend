import SelectProxy from './SelectProxy'
import Level from '../api/level'
const LevelSelectProxy = function(param, callback, scope) {
    this.extraParam = param || null
    this.LevelProxy = new SelectProxy(Level.getUrl(), callback, scope)

    if (this.extraParam) {
        this.setParam(this.extraParam)
    }
}

LevelSelectProxy.prototype.setParam = function(param) {
    if (!param.fields) {
        param.fields = ['id', 'type_name']
    }

    this.LevelProxy.setExtraParam(param)
    return this
}

LevelSelectProxy.prototype.load = function() {
    this.LevelProxy.load()
}

export default LevelSelectProxy
