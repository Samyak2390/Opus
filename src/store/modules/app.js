import * as MutationTypes from '@/store/mutation-types'

const state = {
  page: window.location.pathname,
  snackbarSettings: {
    show: false,
    color: '',
    text: ''
  },
  loader: {
    show: false,
    message: ''
  }
}

const getters = {
  currentPage(state) {
    return state.page
  },
  snackbarSettings(state) {
    return state.snackbarSettings
  },
  loaderSettings(state) {
    return state.loader
  }
}

const actions = {
  changePage({ commit }, page) {
    commit(MutationTypes.CHANGEPAGE, page)
  },
  showSnackbar({ commit }, payload) {
    commit(MutationTypes.SHOWSNACKBAR, payload)
  },
  loader({ commit }, payload) {
    commit(MutationTypes.LOADER, payload)
  }
}

const mutations = {
  [MutationTypes.CHANGEPAGE](state, page) {
    state.page = page
  },
  [MutationTypes.SHOWSNACKBAR](state, payload) {
    state.snackbarSettings = payload
  },
  [MutationTypes.LOADER](state, payload) {
    state.loader = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
