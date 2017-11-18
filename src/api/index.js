import { get, post } from '@/services/Http'

const Auth = {
  login: loginData => post('staff/login', loginData),
  refreshCaptcha: () => get('common/refresh-captcha'),
  logout: () => get('staff/logout')
}

export default {
  Auth
}
