import editor_confi from './editor'
import attr_config from './Attr'

/*
* 取错名字，这里是常量，不是配置
* */

let domain
let url
let baseUrl
if (process.env.NODE_ENV === 'production') {
  domain = ''
  url = 'http://yanggang112.51vip.biz:40003/admin/uploadfile'
  baseUrl = 'http://yanggang112.51vip.biz:40003'
} else {
  domain = '/admin'
  url = 'http://www.edus.com/admin/uploadfile'
  baseUrl = 'http://www.edus.com'
}

const upload_url = domain + '/uploadfile'
const slide_upload_url = domain + '/slide-upload'
const excel_upload = domain + "/excel-upload";

const APP_CONST = {}

Object.defineProperty(APP_CONST, 'DOMAIN', {
  value: domain,
  writable: false, // 设置属性只读
  configurable: true,
  enumerable: true
})

Object.defineProperty(APP_CONST, 'UPLOAD_URL', {
  value: upload_url,
  writable: false, // 设置属性只读
  configurable: true,
  enumerable: true
})

Object.defineProperty(APP_CONST, 'SLIDE_UPLOAD_URL', {
  value: slide_upload_url,
  writable: false,
  configurable: true,
  enumerable: true
})

Object.defineProperty(APP_CONST, "EXCEL_UPLOAD", {
    value: excel_upload,
    writable: false, //设置属性只读
    configurable: true,
    enumerable: true
});

editor_confi.uploadConfig.action = upload_url
Object.defineProperty(APP_CONST, 'editor_option', {
  value: editor_confi,
  writable: false,
  configurable: true,
  enumerable: true
})

Object.defineProperty(APP_CONST, 'ATTR', {
  value: attr_config,
  writable: false,
  configurable: true,
  enumerable: true
})

Object.defineProperty(APP_CONST, 'UPLOAD_BASE_URL', {
  value: url,
  writable: false,
  configurable: true,
  enumerable: true
})

Object.defineProperty(APP_CONST, 'BASE_URL', {
  value: baseUrl,
  writable: false,
  configurable: true,
  enumerable: true
})
export const PHONE_REG = /^\d+$/
export const QQ_REG = /^[0_9]+$/
export const PRICE_REG = /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/

export default APP_CONST
