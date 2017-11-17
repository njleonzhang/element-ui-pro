module.exports = {
  set(key, data) {
    return window.localStorage.setItem(key, window.JSON.stringify(data))
  },
  get(key) {
    return window.JSON.parse(window.localStorage.getItem(key))
  },
  remove(key) {
    return window.localStorage.removeItem(key)
  }
}
