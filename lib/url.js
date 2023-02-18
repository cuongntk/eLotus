import { isEmpty } from 'lodash'

export const createQueryString = (params) => {
  if (isEmpty(params)) {
    return ''
  }
  const ret = []
  for (let param in params) ret.push(param + '=' + params[param])
  return ret.join('&')
}

export const gotoUrlPageBlank = (url) => {
  if (!url) return null
  const element = document.createElement('a')
  element.setAttribute('href', url)
  element.setAttribute('target', '_blank')

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}
