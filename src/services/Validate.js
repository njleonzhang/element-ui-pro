import { isInteger } from 'lodash'

const cellphoneRe = /^1\d{10}$/
const idNumberRe = /^\d{17}([0-9]|X)$/
export let cellphontRe = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
export let passwordRe = /^[0-9A-Za-z]{6,12}$/
export let noneEmptyValue = /[^(^\s+$)]/ // 非全为空白字符的字符串

export function isCellphone(cellphone) {
  return cellphoneRe.test(cellphone)
}

export function isIdNumber(idNumber) {
  return idNumberRe.test(idNumber)
}

const typeMap = {
  province: 0,
  city: 1,
  district: 2
}

/**
 *
 * @param {string} type 'province', 'city', 'district'
 */
export function createDistrictValidator(type) {
  return function(rule, value, callback) {
    if (value[typeMap[type]]) {
      callback()
      return
    }
    callback(new Error('请选择地区'))
  }
}

export function createNumberValidator(min, max) {
  return function(rule, value, callback) {
    if (isInteger(value)) {
      if (value < min || value > max) {
        callback(new Error(`该项取值范围为${min} ~ ${max}`))
      }
    }

    callback()
  }
}
