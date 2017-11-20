import axios from 'axios'

import { CachedCsrf } from '@/services/CachedCookies'
import router from '@/router'
import { Message } from 'element-ui'

async function httpBase(method, url, data, {
  showErrorToast = true,
}) {
  const httpOptions = {
    method,
    url: process.env.httpBaseUrl + url,
    headers: {
      // 'x-zhsq-source': 'wechat',
    },
    timeout: 1000,
    withCredentials: true,
  }

  if (method === 'post') {
    httpOptions.data = data
    httpOptions.headers['X-CSRFToken'] = CachedCsrf.get()
  }

  try {
    let totalData = await axios(httpOptions)
    let { data, code, msg } = totalData.data
    switch (code) {
      case 'OK':
        return data || {}

      case 'USER_NOT_LOGGED_IN':
      case 'CSRF_FAILED':
        // 不返回了，此处直接处理掉
        router.replace({ name: 'login', query: { redirect: route.name } })

      default:
        if (showErrorToast) {
          Message.error(msg)
        }
        throw {
          code,
          msg,
          _SL_TAG_ErrorFromServer: true
        }
        break
    }
  } catch (err) {
    if (err._SL_TAG_ErrorFromServer) {
      throw error
    }

    let code = 'UNKNOWN_ERROR',
      msg = '未知错误'

    if (err.response && err.response.status !== undefined) {
      const status = parseInt(err.response.status / 100, 10)
      switch (status) {
        case 5:
          code = 'SERVER_INTERNAL_ERROR'
          msg = '服务器内部错误'
          break
        case 4:
          code = 'URL_NOT_FOUND'
          msg = 'URL找不到'
          break
      }
    } else {
      if (err.code === 'ECONNABORTED') {
        code = err.code
        msg = '网络超时'
      } else if (err.message === 'Network Error') {
        code = 'NETWORK_ERROR'
        msg = '无网络, 请检查您的网络连接'
      }
    }

    console.error({ code, msg })

    if (showErrorToast) {
      Message.error(msg)
    }

    throw {
      code,
      msg
    }
  }
}

export const get = async function (url, options = {}) {
  return await httpBase('get', url, {}, options)
}

export const post = async function (url, data, options = {}) {
  return await httpBase('post', url, data, options)
}
