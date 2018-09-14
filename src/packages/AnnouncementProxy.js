import SelectProxy from './SelectProxy'
import Announcement from '../api/announcement'
const AnnouncementSelectProxy = function(param, callback, scope) {
    this.extraParam = param || null
    this.AnnouncementProxy = new SelectProxy(Announcement.getUrl(), callback, scope)

    if (this.extraParam) {
        this.setParam(this.extraParam)
    }
}

AnnouncementSelectProxy.prototype.setParam = function(param) {
    if (!param.fields) {
        param.fields = ['id', 'content']
    }

    this.AnnouncementProxy.setExtraParam(param)
    return this
}

AnnouncementSelectProxy.prototype.load = function() {
    this.AnnouncementProxy.load()
}

export default AnnouncementSelectProxy
