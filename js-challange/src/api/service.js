import API from './index'

export default {
  getStore () {
    return API.get(`/venues/164/activities?limit=6&offset=0`)
  }
}