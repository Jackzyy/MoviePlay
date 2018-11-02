import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// import * as Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:''
  },
  mutations: {
    'CHANGE_USERINFO'(state,payload){
      state.userInfo = payload
    },
    'REMOVE_USERINFO' (state, payload){
      state.userInfo = payload
    }
  },
  actions: {

  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => localStorage.getItem(key),
        setItem: (key, value) => localStorage.setItem(key, value),
        removeItem: key => localStorage.removeItem(key),
      },
      // storage: {
      //   getItem: key => Cookies.get(key),
      //   setItem: (key, value) =>
      //     Cookies.set(key, value),
      //   removeItem: key => Cookies.remove(key),
      // },
    }),
  ],
})
