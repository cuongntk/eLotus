import axios from 'axios'
import { getCookie } from 'lib/cookie'
import { trimData } from 'lib/utils'

/**
 *
 * parse error response
 */
function parseError(messages) {
  // error
  if (messages) {
    if (messages instanceof Array) {
      return Promise.reject({ messages: messages })
    } else {
      return Promise.reject({ messages: [messages] })
    }
  } else {
    return Promise.reject({ messages: ['Server quá tải'] })
  }
}

/**
 * parse response
 */
function parseBody(response) {
  const resData = response.data
  // console.log(resData)
  if (response.status === 500) {
    return
  }
  if (response.status === 401) {
    return parseError(resData.messages)
  }
  if (response.status === 200) {
    // if (resData.errCode === '01') window.location = pathLogin(window.location)
    return resData
  }
  // Router.push(path404)
  return parseError(resData.messages)
}

/**
 * axios instance
 */
// let baseURL = ''
let instance = axios.create({
  // baseURL: '',
  timeout: 60000,
})

// request header
instance.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    if (config.data) {
      config.data = trimData(config.data)
    }
    config.headers = {
      Accept: 'application/json',
      Authorization: 'Bearer ' + getCookie('authToken'),
    }

    config.baseURL = process.env.API_URL
    config.params = { ...config.params, api_key: 'dbf3e670c585b485d987b94d9cb8d5be' }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// response parse
instance.interceptors.response.use(
  (response) => {
    return parseBody(response)
  },
  (error) => {
    if (typeof error.response === 'undefined') {
      alert('no internet connection')
      return Promise.reject(error)
    }
    if (401 === error.response.status) {
      // window.location = pathLogin(window.location)
    }

    return Promise.reject(error)
  }
)

export const http = instance
