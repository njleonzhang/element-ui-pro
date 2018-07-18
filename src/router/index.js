import Vue from 'vue'
import Router from 'vue-router'
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
          name: 'home',
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
router.beforeEach(async (to, from, next) => {
  let app = router.app

  // set active item in side bar
  store.dispatch(types.sideBar.ACTIVE, to.fullPath)

  if (app._inited) {
    next()
  } else {
    // 第一次启动的时候执行
    app._inited = true
    try {
      // session 检测的代码逻辑，根据具体业务定制。
      // let data = await Auth.checkAuth()
      // if (data && data.id) {
      //   store.dispatch(types.userInfo.SAVE, data)
      //   next()
      // } else {
      //   if (to.path === '/login') {
      //     next()
      //   } else {
      //     next({
      //       path: '/login',
      //       query: { redirect: to.path }
      //     })
      //   }
      // }
      next()
    } catch (err) {
      Notification.error({
        title: '错误',
        message: err.payload.msg
      })
    }
  }
})

export default router
