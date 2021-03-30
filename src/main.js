import Vue from 'vue'
import * as axios from './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import qs from 'qs'
import * as echarts from 'echarts'
import md5 from 'js-md5'

// 以下是自定义的
import _notify from '@/assets/js/_notify.js'
import apiList from '@/assets/js/api.js'
import local from '@/assets/js/local.js'
import extend from '@/assets/js/extend.js'

Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios
Vue.prototype.$notify = _notify
Vue.prototype.$extend = extend
Vue.prototype.$apiList = apiList
Vue.prototype.$local = local
Vue.prototype.$qs = qs
Vue.prototype.$md5 = md5

Vue.config.productionTip = false

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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
