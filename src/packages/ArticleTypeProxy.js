import SelectProxy from './SelectProxy'
import ArticleType from '../api/articleType'
const ArticleTypeSelectProxy = function(param, callback, scope) {
  this.extraParam = param || null
  this.ArticleTypeProxy = new SelectProxy(ArticleType.getUrl(), callback, scope)

  if (this.extraParam) {
    this.setParam(this.extraParam)
  }
}

ArticleTypeSelectProxy.prototype.setParam = function(param) {
  if (!param.fields) {
    param.fields = ['id', 'name']
  }

  this.ArticleTypeProxy.setExtraParam(param)
  return this
}

ArticleTypeSelectProxy.prototype.load = function() {
  this.ArticleTypeProxy.load()
}

export default ArticleTypeSelectProxy
