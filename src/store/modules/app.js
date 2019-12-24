import * as MutationTypes from '@/store/mutation-types'

const state = {
  page: window.location.pathname,
  snackbarSettings: {
    show: false,
    color: '',
    text: ''
  }
}

const getters = {
  currentPage(state) {
    return state.page
  },
  snackbarSettings(state) {
    return state.snackbarSettings
  }
}

const actions = {
  changePage({ commit }, page) {
    commit(MutationTypes.CHANGEPAGE, page)
  },
  showSnackbar({ commit }, payload) {
    commit(MutationTypes.SHOWSNACKBAR, payload)
  }
}

const mutations = {
  [MutationTypes.CHANGEPAGE](state, page) {
    state.page = page
  },
  [MutationTypes.SHOWSNACKBAR](state, payload) {
    state.snackbarSettings = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
