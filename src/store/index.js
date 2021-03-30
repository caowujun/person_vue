import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      loginname: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem(
        'user')).loginname,
      cnname: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem(
        'user')).cnname
    },
    token: window.localStorage.getItem('token' || '[]') == null ? '' : window.localStorage.getItem('token' || '[]')
  },
  mutations: {
    login (state, successResponse) {
      state.user = successResponse.data.data
      state.token = successResponse.headers.token

      window.localStorage.setItem('user', JSON.stringify(successResponse.data.data))
      window.localStorage.setItem('token', successResponse.headers.token)
    },
    logout (state, user) {
      window.localStorage.removeItem('user')
      window.localStorage.removeItem('token')
    }
  },
  actions: {
  },
  modules: {
  }
})
