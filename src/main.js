import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as echarts from 'echarts'
import md5 from 'js-md5'
import i18n from '@/assets/lang'

// 以下是自定义的
import _notify from '@/assets/js/_notify.js'
import apiList from '@/assets/js/api.js'
import local from '@/assets/js/local.js'
import extend from '@/assets/js/extend.js'
import customconfig from '@/assets/js/customconfig.js'

// import lang_en from 'element-ui/lib/locale/lang/en'
import lang from 'element-ui/lib/locale/lang/zh-CN'
import locale from 'element-ui/lib/locale'
// 设置语言
locale.use(lang)

Vue.config.productionTip = false

Vue.use(ElementUI)
// Vue.use(axios)

Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios
Vue.prototype.$notify = _notify
Vue.prototype.$extend = extend
Vue.prototype.$apiList = apiList
Vue.prototype.$local = local
Vue.prototype.$qs = qs
Vue.prototype.$md5 = md5
Vue.prototype.$customconfig = customconfig

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (localStorage.getItem('token')) { // 如果已经登录的话
      next()
    } else {
      if (to.path === '/weblogin') { // 如果是登录页面的话，直接next()
        next()
      } else { // 否则 跳转到登录页面
        next({
          path: '/weblogin'
        })
      }
    }
  } else {
    next()
  }
})

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = window.localStorage.getItem('token')
    config.headers.Authorization = token
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    if (response.data.code === -1 && response.data.msg === '400') {
      if (window.localStorage.getItem('token')) {
        store.commit('logout')
        router.replace({
          name: 'WebLogin',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      }
    }
    return response
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
