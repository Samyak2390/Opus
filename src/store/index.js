import Vue from 'vue'
import Vuex from 'vuex'

// import modules
import auth from './modules/auth'
import app from './modules/app'

Vue.use(Vuex)

export default new Vuex.Store({
  // state: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  modules: {
    auth,
    app
  }
})
