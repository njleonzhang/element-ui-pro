import types from './types'
import { CachedUserInfo } from '@/services/CachedStorages'

export default {
  state: {
    content: {
      id: '',
      name: '',
      account: '',
      role: '',
      is_super_admin: false,
      csrftoken: ''
    }
  },

  mutations: {
    [types.SAVE](state, data) {
      if (data) {
        CachedUserInfo.set(data)
      }
      state.content = data
    },

    [types.DELETE](state) {
      state.content = ''
      CachedUserInfo.remove()
    }
  },

  actions: {
    [types.SAVE]({commit}, data) {
      commit(types.SAVE, data)
    },

    [types.DELETE]({commit}) {
      commit(types.DELETE)
    }
  }
}
