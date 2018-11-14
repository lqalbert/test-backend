import SelectProxy from './SelectProxy'
import Access from '../api/access'
const AccessSelectProxy = function(param, callback, scope) {
  this.extraParam = param || null
  this.AccessProxy = new SelectProxy(Access.getUrl(), callback, scope)

  if (this.extraParam) {
    this.setParam(this.extraParam)
  }
}

AccessSelectProxy.prototype.setParam = function(param) {
  if (!param.fields) {
    param.fields = ['id', 'content']
  }

  this.AccessProxy.setExtraParam(param)
  return this
}

AccessSelectProxy.prototype.load = function() {
  this.AccessProxy.load()
}

export default AccessSelectProxy
