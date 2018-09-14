import SelectProxy from './SelectProxy'
import Violation from '../api/Violation'

const ViolationSelectProxy = function(param, callback, scope) {
  this.extraParam = param || null
  this.violationProxy = new SelectProxy(Violation.getUrl(), callback, scope)

  if (this.extraParam) {
    this.setParam(this.extraParam)
  }
}

ViolationSelectProxy.prototype.setParam = function(param) {
  if (!param.fields) {
    param.fields = ['id', 'nackname']
  }

  this.violationProxy.setExtraParam(param)
  return this
}

ViolationSelectProxy.prototype.load = function() {
  this.violationProxy.load()
}

export default ViolationSelectProxy
