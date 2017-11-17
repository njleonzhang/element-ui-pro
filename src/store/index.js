import Vue from 'vue'
import Vuex from 'vuex'
import sideBar from './SideBar'
import userInfo from './UserInfo'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    sideBar,
    userInfo
  }
})

export default store
