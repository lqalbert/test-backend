import SelectProxy from './SelectProxy'
import Course from '../api/course'
const CourseSelectProxy = function(param, callback, scope) {
  this.extraParam = param || null
  this.CourseProxy = new SelectProxy(Course.getUrl(), callback, scope)

  if (this.extraParam) {
    this.setParam(this.extraParam)
  }
}

CourseSelectProxy.prototype.setParam = function(param) {
  if (!param.fields) {
    param.fields = ['id', 'content']
  }

  this.CourseProxy.setExtraParam(param)
  return this
}

CourseSelectProxy.prototype.load = function() {
  this.CourseProxy.load()
}

export default CourseSelectProxy
