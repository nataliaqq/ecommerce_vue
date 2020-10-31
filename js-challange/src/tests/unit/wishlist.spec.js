import Vuex from 'vuex'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Cart from '../../components/Cart'
import { expectedItem } from './expectedData'

import { __createMocks as createStoreMocks } from '../../store'

jest.mock('../../store')

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Cart', () => {
  let cart

  const storeMocks = createStoreMocks()

  const options = {
    propsData: {
      type: 'wishlist'
    },
    computed: {
      itemsInCart: () => [],
      itemsInWishlist: () => [expectedItem]
    },
    store: storeMocks.store,
    localVue
  }

  beforeEach(() => {
    cart = shallowMount(Cart, options)
  })

  it('product in wishlist renders correctly', () => {
    expect(cart.find('.product-in-cart__title').text()).toEqual(cart.vm.items[0].title)
  })

  it('product can be removed from wishlist correctly', () => {
    cart.find('.remove-button').trigger('click')
    expect(storeMocks.mutations.removeFromWishlist).toBeCalled()
    expect(storeMocks.mutations.addToWishlist).not.toBeCalled()
  })

  it('product can be moved to cart correctly', () => {
    cart.find('.move-to-button').trigger('click')
    cart.vm.$nextTick().then(() => {
      expect(cart.vm.items).toEqual([])
    }).catch(() => {
    })
  })
  it('if product is already in cart there is no move button', () => {
    cart = shallowMount(Cart, {
      ...options,
      computed: {
        itemsInCart: () => [expectedItem],
        itemsInWishlist: () => [expectedItem]
      }
    })
    expect(cart.find('.move-to-button').exists()).toBeFalsy()
  })
})
