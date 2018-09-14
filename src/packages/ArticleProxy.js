import SelectProxy from './SelectProxy'
import Article from '../api/article'
const ArticleSelectProxy = function(param, callback, scope) {
    this.extraParam = param || null
    this.ArticleProxy = new SelectProxy(Article.getUrl(), callback, scope)

    if (this.extraParam) {
        this.setParam(this.extraParam)
    }
}

ArticleSelectProxy.prototype.setParam = function(param) {
    if (!param.fields) {
        param.fields = ['id', 'title', 'author', 'type_id']
    }

    this.ArticleProxy.setExtraParam(param)
    return this
}

ArticleSelectProxy.prototype.load = function() {
    this.ArticleProxy.load()
}

export default ArticleSelectProxy
