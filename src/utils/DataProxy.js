/* eslint-disable no-mixed-spaces-and-tabs */
import AxiosInstance from './request'

const orderMap = {
  'ascending': 'asc',
  'descending': 'desc'
}

const DataProxy = function(url, pageSize, callback, scope) {
  this.url = url
  this.pageSize = pageSize || 30
  this.orderField = ''
  this.orderWay = 'desc'
  this.page = 1
  this.extraParam = null
  this._scope = scope || null
  this._callback = callback
  if (arguments[4]) {
  	this._errorCallback = arguments[4]
  }
}
DataProxy.prototype.setOrderField = function(name) {
  this.orderField = name
  return this
}
DataProxy.prototype.setOrderWay = function(name) {
  this.orderWay = orderMap[name]
  return this
}
DataProxy.prototype.setOrder = function(field, way) {
  this.orderField = field
  this.orderWay = orderMap[way]
  this._resetPage()
  return this
}
DataProxy.prototype.setPage = function(page) {
  this.page = page
  return this
}
DataProxy.prototype.setPageSize = function(pageSize) {
  this.pageSize = pageSize
  return this
}
DataProxy.prototype.setExtraParam = function(param) {
  if (param) {
    for (var x in param) {
      if (this[x]) {
        console.warn('extraParam 里的参数会覆盖 DataProxy里面的属性')
      }
    }
    this.extraParam = param
  } else {
  	this.extraParam = null
  }
  this._resetPage()
  return this
}
DataProxy.prototype.reset = function() {
  this.orderField = ''
  this.orderWay = 'desc'
  this._resetPage()
  this.extraParam = null
  return this
}
DataProxy.prototype.loadPage = function(page) {
  this.setPage(page).load()
}
DataProxy.prototype._resetPage = function() {
  this.setPage(1)
}
DataProxy.prototype._getParam = function() {
  const o = {}
  if (this.extraParam) {
    for (const x in this.extraParam) {
      o[x] = this.extraParam[x]
    }
  }
  o['pageSize'] = this.pageSize
  o['page'] = this.page
  if (this.orderField && this.orderField.length > 0) {
    o['orderField'] = this.orderField
    o['orderWay'] = this.orderWay
  }
  return o
}

DataProxy.prototype.load = function() {
  const vmthis = this._scope
  const sel = this
  const proxy = this.url
  let promise = null
  if (typeof this.url == 'string') {
    promise = AxiosInstance.get(this.url, { params: this._getParam() })
  } else {
    promise = proxy.get(this._getParam())
  }

  return promise.then(function(response) {
    if (vmthis) {
      sel._callback.apply(vmthis, [response.data])
    } else {
      sel._callback(response.data)
    }
  }).catch(function(response) {
    vmthis.$message.error('出错了')
    if (sel._errorCallback) {
      sel._callback.apply(vmthis)
    }
    console.log(response)
  })
}

export default DataProxy
