import SelectProxy from './SelectProxy'
import Video from '../api/Video'

const VideoSelectProxy = function(param, callback, scope) {
  this.extraParam = param || null
  this.videoProxy = new SelectProxy(Video.getUrl(), callback, scope)

  if (this.extraParam) {
    this.setParam(this.extraParam)
  }
}

VideoSelectProxy.prototype.setParam = function(param) {
  if (!param.fields) {
    param.fields = ['id', 'name']
  }
  if (!param.business) {
    param.business = 'select'
  }
  this.videoProxy.setExtraParam(param)
  return this
}

VideoSelectProxy.prototype.load = function() {
  this.videoProxy.load()
}

export default VideoSelectProxy
