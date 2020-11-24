import axios from 'axios'
import env from '../config/env'

const baseDomain = env.API_ENDPOINT

const API = axios.create({
  baseURL: baseDomain + '/api/items/'
})

const settings = {
  contentType: 'application/json',
  version: '3.4.0'
}

// Request
API.interceptors.request.use(
  config => {
    config.headers['accept-language'] = settings.languageCode
    config.headers['content-type'] = settings.contentType
    return config
  },
  error => {
    console.log(error)
  }
)

// Response
API.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default API
