import { get, post } from '@/services/Http'

export const Auth = {
  login: loginData => post('user/login/', loginData),
  refreshCaptcha: () => get('common/refresh-captcha'),
  logout: () => get('user/logout/')
}

export const Room = {
  all: () => get('rooms/')
}

export const Building = {
  retrieve: async ({ page, pageSize }) => {
    let { total, items } = await get('buildings/', {
      params: {
        page,
        pageSize
      }
    })

    // simulate the server pagination
    return {
      total,
      items: items.slice((page - 1) * pageSize, page * pageSize)
    }
  }
}
