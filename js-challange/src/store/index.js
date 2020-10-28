import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    itemsInCart: []
  },
  mutations: {
    addToCart (state, item) {
      state.itemsInCart.push(item)
    },
    removeFromCart (state, item) {
      const index = state.itemsInCart.findIndex(itemInCart => itemInCart.uuid === item.uuid)
      index > -1 ? state.itemsInCart.splice(index, 1) : false
    }
  }
})

export default store