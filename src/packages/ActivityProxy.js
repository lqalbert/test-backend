import SelectProxy from './SelectProxy'
import Activity from '../api/activity'
const ActivitySelectProxy = function(param, callback, scope) {
  this.extraParam = param || null
  this.ActivityProxy = new SelectProxy(Activity.getUrl(), callback, scope)

  if (this.extraParam) {
    this.setParam(this.extraParam)
  }
}

ActivitySelectProxy.prototype.setParam = function(param) {
  if (!param.fields) {
    param.fields = ['id', 'content']
  }

  this.ActivityProxy.setExtraParam(param)
  return this
}

ActivitySelectProxy.prototype.load = function() {
  this.ActivityProxy.load()
}

export default ActivitySelectProxy
