import AxiosInstance from '../utils/request'

// const orderMap = {
//   'ascending': 'asc',
//   'descending': 'desc'
// }
const DataProxy = function(url, callback, scope) {
  this.url = url
  this.pageSize = 100
  this.page = 1
  this.extraParam = null
  this._scope = scope
  this._callback = callback
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
  for (const x in param) {
    if (this[x]) {
      console.log('extranParam 里的参数会覆盖 DataProxy里面的属性')
      continue
    }
  }
  this.extraParam = param
  return this
}
DataProxy.prototype.reset = function() {
  this.page = 1
  this.extraParam = null
  return this
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
  return o
}

DataProxy.prototype.load = function() {
  const vmthis = this._scope
  const sel = this
  const proxy = this.url
  let promise = null
  if (typeof (this.url) === 'string') {
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
    console.log(response)
  })
}

DataProxy.prototype.find = function() {
  const vmthis = this._scope
  const sel = this
  const proxy = this.url
  let promise = null
  promise = proxy.find((this._getParam()).id)
  return promise.then(function(response) {
    if (vmthis) {
      sel._callback.apply(vmthis, [response.data])
    } else {
      sel._callback(response.data)
    }
  }).catch(function(response) {
    console.log(response)
  })
}

export default DataProxy
