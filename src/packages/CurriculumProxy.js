import SelectProxy from './SelectProxy'
import Curriculun from '../api/curriculum'
const CurriculunSelectProxy = function(param, callback, scope) {
  this.extraParam = param || null
  this.CurriculunProxy = new SelectProxy(Curriculun.getUrl(), callback, scope)

  if (this.extraParam) {
    this.setParam(this.extraParam)
  }
}

CurriculunSelectProxy.prototype.setParam = function(param) {
  if (!param.fields) {
    param.fields = ['id', 'content']
  }

  this.CurriculunProxy.setExtraParam(param)
  return this
}

CurriculunSelectProxy.prototype.load = function() {
  this.CurriculunProxy.load()
}

export default CurriculunSelectProxy
