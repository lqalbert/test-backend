import SelectProxy from './SelectProxy'
import College from '../api/college'
const CollegeSelectProxy = function(param, callback, scope) {
  this.extraParam = param || null
  this.CollegeProxy = new SelectProxy(College.getUrl(), callback, scope)

  if (this.extraParam) {
    this.setParam(this.extraParam)
  }
}

CollegeSelectProxy.prototype.setParam = function(param) {
  if (!param.fields) {
    param.fields = ['id', 'name']
  }

  this.CollegeProxy.setExtraParam(param)
  return this
}

CollegeSelectProxy.prototype.load = function() {
  this.CollegeProxy.load()
}

export default CollegeSelectProxy
