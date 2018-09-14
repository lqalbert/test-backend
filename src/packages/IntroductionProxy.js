import SelectProxy from './SelectProxy'
import Introduction from '../api/introduction'
const IntroductionSelectProxy = function(param, callback, scope) {
    this.extraParam = param || null
    this.IntroductionProxy = new SelectProxy(Introduction.getUrl(), callback, scope)

    if (this.extraParam) {
        this.setParam(this.extraParam)
    }
}

IntroductionSelectProxy.prototype.setParam = function(param) {
    if (!param.fields) {
        param.fields = ['id', 'content']
    }

    this.IntroductionProxy.setExtraParam(param)
    return this
}

IntroductionSelectProxy.prototype.load = function() {
    this.IntroductionProxy.load()
}

export default IntroductionSelectProxy
