import types from './types'

export default {
  state: {
    close: false,
    active: ''
  },

  mutations: {
    [types.TOGGLE](state) {
      state.close = !state.close
    },

    [types.OPEN](state) {
      state.close = false
    },

    [types.CLOSE](state) {
      state.close = true
    },

    [types.ACTIVE](state, index) {
      state.active = index
    }
  },

  actions: {
    [types.TOGGLE]({commit}) {
      commit(types.TOGGLE)
    },

    [types.OPEN]({commit}) {
      commit(types.OPEN)
    },

    [types.CLOSE]({commit}) {
      commit(types.CLOSE)
    },

    [types.ACTIVE]({commit}, index) {
      commit(types.ACTIVE, index)
    }
  }
}
