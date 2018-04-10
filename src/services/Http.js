import { HttpBase, HttpGlobalConfig } from 'zy-http-base'
import { CachedCsrf } from './CachedCookies'
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
    console.log(err)
    const { code } = err.payload

    if (code === 'USER_NOT_LOGGED_IN' || code === 'CSRF_FAILED') {
      const route = router.app.$route
      router.replace({ name: 'login', query: { redirect: route.name } })
    }
  },
  () => {
    return CachedCsrf.get()
  },
  (msg) => {
    Message.error(msg)
  },
  null
))

export const get = httpClient.get.bind(httpClient)
export const post = httpClient.post.bind(httpClient)
