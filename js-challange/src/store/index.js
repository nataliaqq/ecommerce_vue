import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    itemsInCart: [],
    itemsInWishlist: [],
  },
  mutations: {
    addToCart (state, item) {
      state.itemsInCart.push(item)
    },
    removeFromCart (state, item) {
      const index = state.itemsInCart.findIndex(itemInCart => itemInCart.uuid === item.uuid)
      index > -1 ? state.itemsInCart.splice(index, 1) : false
    },
    addToWishlist (state, item) {
      state.itemsInWishlist.push(item)
    },
    removeFromWishlist (state, item) {
      const index = state.itemsInWishlist.findIndex(itemInWishlist => itemInWishlist.uuid === item.uuid)
      index > -1 ? state.itemsInWishlist.splice(index, 1) : false
    }
  }
})

export default store