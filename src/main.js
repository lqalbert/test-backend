import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-cn' // lang i18n

import '@/styles/index.scss' // global css
import VModal from 'vue-js-modal'
import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
import newDialog from './components/Commontable/Dialog'
import InitObject from './mix/InitObjectFromObject'
import ShowDialog from './mix/ShowDialog'
import Delete from './mix/Delete'
import moment from 'moment/moment'
import echarts from 'echarts'

Vue.use(ElementUI, { locale })
Vue.use(VModal)
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.component('MyDialog', newDialog)
Vue.mixin(InitObject)
Vue.mixin(ShowDialog)
Vue.mixin(Delete)
Vue.filter('moment', function(value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
  // return moment(value).format(formatString); // value可以是普通日期 20170723
  return moment.unix(value).format(formatString) // 这是时间戳转时间
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
