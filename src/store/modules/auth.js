// import axios from 'axios';
import * as MutationTypes from '@/store/mutation-types'

const state = {
  user: localStorage.user
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
    commit(MutationTypes.LOGOUT)
  }
}

const mutations = {
  [MutationTypes.LOGIN](state) {
    state.user = localStorage.user
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
