import SelectProxy from './SelectProxy'
import Teacher from '../api/teacher'
const TeacherSelectProxy = function(param, callback, scope) {
  this.extraParam = param || null
  this.TeacherProxy = new SelectProxy(Teacher.getUrl(), callback, scope)

  if (this.extraParam) {
    this.setParam(this.extraParam)
  }
}

TeacherSelectProxy.prototype.setParam = function(param) {
  if (!param.fields) {
    param.fields = ['id', 'content']
  }

  this.TeacherProxy.setExtraParam(param)
  return this
}

TeacherSelectProxy.prototype.load = function() {
  this.TeacherProxy.load()
}

export default TeacherSelectProxy
