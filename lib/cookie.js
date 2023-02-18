export const getCookie = (cname) => {
  if (typeof document === 'undefined') return ''
  let name = cname + '='
  let ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export const setCookie = (name, value, days, path = '') => {
  if (days) {
    let d = new Date()
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
    document.cookie = name + '=' + value + ';expires=' + d.toGMTString() + ';path=' + path
  } else {
    document.cookie = name + '=' + value + ';path=' + path
  }
}

export const deleteCookie = (name) => {
  document.cookie = name + '=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}
