import SelectProxy from './SelectProxy'
import Chatmsg from '../api/chatmsg'
const ChatmsgSelectProxy = function(param, callback, scope) {
  this.extraParam = param || null
  this.ChatmsgProxy = new SelectProxy(Chatmsg.getUrl(), callback, scope)

  if (this.extraParam) {
    this.setParam(this.extraParam)
  }
}

ChatmsgSelectProxy.prototype.setParam = function(param) {
  if (!param.fields) {
    param.fields = ['id', 'content']
  }

  this.ChatmsgProxy.setExtraParam(param)
  return this
}

ChatmsgSelectProxy.prototype.load = function() {
  this.ChatmsgProxy.load()
}

ChatmsgSelectProxy.prototype.exportxls = function() {
    this.ChatmsgProxy.exportxls()
}

export default ChatmsgSelectProxy
