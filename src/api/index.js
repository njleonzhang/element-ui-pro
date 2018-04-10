import { get, post } from '@/services/Http'

export const Auth = {
  login: loginData => post('POST/login', loginData),
  refreshCaptcha: () => get('common/refresh-captcha'),
  logout: () => get('staff/logout')
}
