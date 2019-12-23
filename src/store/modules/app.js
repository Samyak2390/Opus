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
  showSnackbar({ commit }, show = true, color, text) {
    commit(MutationTypes.SHOWSNACKBAR, show, color, text)
  }
}

const mutations = {
  [MutationTypes.CHANGEPAGE](state, page) {
    state.page = page
  },
  [MutationTypes.SHOWSNACKBAR](state, show, color, text) {
    state.snackbarSettings = { show, color, text }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
