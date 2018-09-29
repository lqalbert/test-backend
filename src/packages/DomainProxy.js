import SelectProxy from './SelectProxy'
import Domain from '../api/domain'
const DomainSelectProxy = function(param, callback, scope) {
  this.extraParam = param || null
  this.DomainProxy = new SelectProxy(Domain.getUrl(), callback, scope)

  if (this.extraParam) {
    this.setParam(this.extraParam)
  }
}

DomainSelectProxy.prototype.setParam = function(param) {
  if (!param.fields) {
    param.fields = ['id', 'title', 'author', 'type_id']
  }

  this.DomainProxy.setExtraParam(param)
  return this
}

DomainSelectProxy.prototype.load = function() {
  this.DomainProxy.load()
}

export default DomainSelectProxy
