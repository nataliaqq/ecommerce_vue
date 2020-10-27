import axios from 'axios'
import env from '../config/env'

const baseDomain = env.API_ENDPOINT

const API = axios.create({
  baseURL: baseDomain + '/api/v3'
})

// Request
API.interceptors.request.use(
  config => {
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
