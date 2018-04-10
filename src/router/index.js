import Vue from 'vue'
import Router from 'vue-router'
// import {makeRetry} from '@/services/Tools'
// import api from '@/api'
// import {CachedBlockId} from '@/services/CachedStorages'
import types from '@/store/types'
import store from '@/store'

import Mgmt from '@/components/layout/Mgmt'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Room from '@/views/Room'
import Buildings from '@/views/Buildings'
import Staff from '@/views/Staff'
import My from '@/views/My'
import NotFound from '@/components/NotFound'

Vue.use(Router)

let router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/my',
      name: 'my',
      component: My
    },
    {
      path: '/mgmt',
      component: Mgmt,
      children: [
        {
          path: 'home',
          component: Home
        },
        {
          path: 'rooms',
          component: Room
        },
        {
          path: 'buildings',
          component: Buildings
        },
        {
          path: 'staff',
          component: Staff
        },
      ]
    },
    {
      path: '/',
      redirect: '/mgmt/home'
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  let app = router.app

  // set active item in side bar
  store.dispatch(types.sideBar.ACTIVE, to.fullPath)

  if (app.init) {
    next()
  } else {
    // 第一次启动的时候执行
    store.dispatch(types.userInfo.SAVE, {
      name: 'Leon',
      block_name: 'Element社区',
      staff_id: '1234'
    })
    next()

    // let retryCommonPost = makeRetry(HttpService.SCCommonPost)
    // api.staff('staff/check').then(data => {
    //   app.init = true

    //   if (data && data.block_id) {
    //     CachedBlockId.set(data.block_id)
    //   } else {
    //     router.replace('/login')
    //   }
    //   next()
    // }, _ => {
    //   app.$notify.error({
    //     title: '服务器错误',
    //     message: '无法连接服务器，请稍后重试',
    //     duration: 0,
    //     customClass: 'server-error'
    //   })
    // })
  }
})

export default router
