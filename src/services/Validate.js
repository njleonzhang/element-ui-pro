const cellphoneRe = /^1\d{10}$/
const idNumberRe = /^\d{17}([0-9]|X)$/

export function isCellphone(cellphone) {
  return cellphoneRe.test(cellphone)
}

export function isIdNumber(idNumber) {
  return idNumberRe.test(idNumber)
}
