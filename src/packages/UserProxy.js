import SelectProxy from './SelectProxy'
import User from '../api/user'
const UserSelectProxy = function(param, callback, scope) {
  this.extraParam = param || null
  this.UserProxy = new SelectProxy(User.getUrl(), callback, scope)

  if (this.extraParam) {
    this.setParam(this.extraParam)
  }
}

UserSelectProxy.prototype.setParam = function(param) {
  if (!param.fields) {
    param.fields = ['id', 'username']
  }

  this.UserProxy.setExtraParam(param)
  return this
}

UserSelectProxy.prototype.load = function() {
  this.UserProxy.load()
}

export default UserSelectProxy
