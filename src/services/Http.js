import Vue from 'vue'
import {CachedBlockId} from '@/services/CachedStorages'
import {CachedCsrf} from '@/services/CachedCookies'
import router from '@/router'

const httpTimeOut = 5000

let getHttpOptions = {
  timeout: httpTimeOut,
  credentials: true
}

let postHttpOptios = {
  headers: {
    'X-CSRFToken': ''
  },
  ...getHttpOptions
}

function httpBase(method, url, data) {
  function vueHttp(method, url, data = {}) {
    if (method === 'POST') {
      postHttpOptios.headers['X-CSRFToken'] = CachedCsrf.get()
      return Vue.http.post(url, data, postHttpOptios)
    } else {
      return Vue.http.get(url, getHttpOptions)
    }
  }

  let vm = router.app
  let route = vm.$route

  return new Promise((resolve, reject) => {
    vueHttp(method, url, data).then(response => {
      let data = response.data
      if (data) {
        switch (data.code) {
          case 'OK':
            resolve(data.data)
            break

          case 'USER_NOT_LOGGED_IN':
          case 'CSRF_FAILED':
            vm.$message({
              type: 'error',
              message: '您的登录已过期，请重新登录'
            })
            router.replace({name: 'login', query: {redirect: route.name}})
            break

          default:
            reject(data.msg)
        }
      }
    }, error => {
      let status = parseInt(error.status / 100, 10)
      let errorMsg = ''
      switch (status) {
        case 5:
          errorMsg = '服务器内部错误'
          break
        case 4:
          errorMsg = 'URL找不到'
          break
        case 0:
          errorMsg = '连接服务器超时'
          break
        default:
          errorMsg = '未知错误'
      }
      reject(errorMsg)
    })
  }).then(data => {
    return data
  }, error => {
    console.log('error', error)
    vm.$message({
      type: 'error',
      message: error
    })
    throw error
  })
}

let baseUrl = process.env.httpBaseUrl

let getCommonUrl = function(url) {
  return `${baseUrl}${url}/`
}

let getPrefixUrl = function(url) {
  // 如果真的出了意外拿不到blockId，这里将其赋值为0，
  // 从而让URL正确，后台会返回session过期的值。
  let blockId = CachedBlockId.get() || 0
  return `${baseUrl}block/${blockId}/${url}/`
}

function SCHttpGet(url) {
  return httpBase('GET', url)
}

function SCHttpPost(url, data) {
  return httpBase('POST', url, data)
}

function SCCommonGet(url) {
  return SCHttpGet(getCommonUrl(url))
}

function SCCommonPost(url, data) {
  return SCHttpPost(getCommonUrl(url), data)
}

function SCPrefixGet(url) {
  return SCHttpGet(getPrefixUrl(url))
}

function SCPrefixPost(url, data) {
  return SCHttpPost(getPrefixUrl(url), data)
}

export default {
  SCHttpGet,
  SCHttpPost,
  SCCommonGet,
  SCCommonPost,
  SCPrefixGet,
  SCPrefixPost
}
