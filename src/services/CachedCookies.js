class CachedCookie {
  constructor(name) {
    this.name = name
    this.cookieValue = ''
  }

  get() {
    if (this.cookieValue) {
      console.log('get from cache', this.cookieValue)
      return this.cookieValue
    }
    if (document.cookie && document.cookie !== '') {
      let cookies = document.cookie.split(' ')
      for (let i = 0; i < cookies.length; i++) {
        let cookie = (cookies[i]).trim()
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, this.name.length + 1) === (`${this.name}=`)) {
          this.cookieValue = decodeURIComponent(cookie.substring(this.name.length + 1))
          break
        }
      }
    }
    console.log('get from cookie', this.cookieValue)
    return this.cookieValue
  }

  clear() {
    console.log('cleared')
    this.cookieValue = ''
  }

  renew() {
    console.log('renew')
    this.cookieValue = ''
    return this.get()
  }
}

export let CachedCsrf = new CachedCookie('csrftoken')
