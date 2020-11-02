import API from './index'

export default {
  getStore (params) {
    return API.get(`/venues/164/activities?limit=${params?.limit || 6}&offset=${params?.offset || 0}`)
  }
}
