import SelectProxy from './SelectProxy'
// import UserData from '../api/userdata'
import UserData from '../api/online'

const OnlineProxy = function(param, callback, scope) {
  this.extraParam = param || null
  this.UserDataProxy = new SelectProxy(UserData.getUrl(), callback, scope)

  if (this.extraParam) {
    this.setParam(this.extraParam)
  }
}

OnlineProxy.prototype.setParam = function(param) {
  if (!param.fields) {
    param.fields = ['id', 'username']
  }

  this.UserDataProxy.setExtraParam(param)
  return this
}

OnlineProxy.prototype.load = function() {
  this.UserDataProxy.load()
}

export default OnlineProxy
