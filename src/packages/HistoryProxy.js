import SelectProxy from './SelectProxy'
import History from '../api/history'
const HistorySelectProxy = function(param, callback, scope) {
    this.extraParam = param || null
    this.HistoryProxy = new SelectProxy(History.getUrl(), callback, scope)

    if (this.extraParam) {
        this.setParam(this.extraParam)
    }
}

HistorySelectProxy.prototype.setParam = function(param) {
    if (!param.fields) {
        param.fields = ['id', 'content']
    }

    this.HistoryProxy.setExtraParam(param)
    return this
}

HistorySelectProxy.prototype.load = function() {
    this.HistoryProxy.load()
}

export default HistorySelectProxy
