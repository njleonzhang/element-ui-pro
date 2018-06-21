import { HttpBase, HttpGlobalConfig } from 'zy-http-base'
import { CachedUserInfo } from '@/services/CachedStorages'
import { Message } from 'element-ui'
import router from '@/router'

const httpClient = new HttpBase(new HttpGlobalConfig(
  process.env.httpBaseUrl,
  null,
  {
    'x-zhsq-source': 'web-bigdata',
  },
  5000,
  (err) => {
    const { code } = err.payload

    if (code === 'USER_NOT_LOGGED_IN') {
      const route = router.app.$route
      router.replace({ name: 'login', query: { redirect: route.name } })
    } else if (code === 'CSRF_FAILED') {
      Message.warning({
        message: '认证失败，请刷新页面重试'
      })
    }
  },
  () => {
    return CachedUserInfo.get() && CachedUserInfo.get().csrftoken
  },
  (msg) => {
    Message.error({
      message: msg
    })
  },
  null
))

export const get = function(...args) {
  return httpClient.get(...args)
}

export const post = function(...args) {
  return httpClient.post(...args)
}
