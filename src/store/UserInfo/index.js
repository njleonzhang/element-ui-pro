import types from './types'
import {CachedUsername, CachedBlockName, CachedStaffId} from '@/services/CachedStorages'

export default {
  state: {
    content: ''
  },

  mutations: {
    [types.SAVE](state, data) {
      if (data) {
        CachedUsername.set(data.name)
        CachedBlockName.set(data.block_name)
        CachedStaffId.set(data.staff_id)
      }
      state.content = `${CachedBlockName.get()}-${CachedUsername.get()}`
    },

    [types.UPDATE](state, data) {
      if (data && data.name) {
        CachedUsername.set(data.name)
      }
      state.content = `${CachedBlockName.get()}-${CachedUsername.get()}`
    },

    [types.DELETE](state) {
      state.content = ''
      CachedUsername.remove()
      CachedBlockName.remove()
      CachedStaffId.remove()
    }
  },

  actions: {
    [types.SAVE]({commit}, data) {
      commit(types.SAVE, data)
    },

    [types.UPDATE]({commit}, data) {
      commit(types.UPDATE, data)
    },

    [types.DELETE]({commit}) {
      commit(types.DELETE)
    }
  }
}
