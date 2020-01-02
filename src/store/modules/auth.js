// import axios from 'axios';
import * as MutationTypes from '@/store/mutation-types'
import apiService from '@/apiConfig/authService'

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
        this.$store.dispatch('showSnackbar', { show: true, color: 'success', text: response.data || 'Successfully Logged out.' })
      })
      .catch(error => {
        this.$store.dispatch('showSnackbar', { show: true, color: 'error', text: error.response.data || 'Something went wrong while logging out.' })
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
