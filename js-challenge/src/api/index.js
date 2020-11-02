import axios from 'axios'
import env from '../config/env'

const baseDomain = env.API_ENDPOINT

const API = axios.create({
  baseURL: baseDomain + '/api/v3'
})

const settings = {
  languageCode: 'it',
  contentType: 'application/json',
  currency: 'EUR',
  version: '3.4.0'
}

// Request
API.interceptors.request.use(
  config => {
    config.headers['accept-language'] = settings.languageCode
    config.headers['content-type'] = settings.contentType
    config.headers['x-musement-currency'] = settings.currency
    config.headers['x-musement-version'] = settings.version
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
