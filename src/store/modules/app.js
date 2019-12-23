import * as MutationTypes from '@/store/mutation-types'

const state = {
  page: window.location.pathname
}

const getters = {
  currentPage(state) {
    return state.page
  }
}

const actions = {
  changePage({ commit }, page) {
    commit(MutationTypes.CHANGEPAGE, page)
  }
}

const mutations = {
  [MutationTypes.CHANGEPAGE](state, page) {
    state.page = page
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
