// import axios from 'axios';
import * as MutationTypes from '@/store/mutation-types'
import apiService from '@/apiConfig/eventService'

const state = {
  user: localStorage.user ? JSON.parse(localStorage.user) : ''
}

const getters = {
  currentUser(state) {
    return state.user
  }
}

const actions = {
  // These parameters are the Vuex context -> could do login (context) {context.commit(...)}
  login({ commit }) {
    commit(MutationTypes.LOGIN)
  },
  logout({ commit }) {
    apiService.userLogout()
      .then(response => {
        console.log('logout res>>>>>', response)
      })
      .catch(error => {
        console.log('logout err>>>>', error.response.data)
      })
    commit(MutationTypes.LOGOUT)
  }
}

const mutations = {
  [MutationTypes.LOGIN](state) {
    state.user = JSON.parse(localStorage.user)
  },
  [MutationTypes.LOGOUT](state) {
    state.user = null
    delete localStorage.token
    delete localStorage.user
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
