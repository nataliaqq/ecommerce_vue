import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const mutations = {
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
  addToWishlist: jest.fn(),
  removeFromWishlist: jest.fn()
}

export const state = {
  itemsInCart: [],
  itemsInWishlist: []
}

// eslint-disable-next-line no-underscore-dangle
export function __createMocks (custom = { getters: {}, mutations: {}, actions: {}, state: {} }) {
  const mockMutations = Object.assign({}, mutations, custom.mutations)
  const mockState = Object.assign({}, state, custom.state)

  return {
    mutations: mockMutations,
    state: mockState,
    store: new Vuex.Store({
      mutations: mockMutations,
      state: mockState
    })
  }
}

export const store = __createMocks().store
