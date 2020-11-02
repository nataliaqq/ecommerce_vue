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
  let wishlist

  const storeMocks = createStoreMocks()

  const options = {
    propsData: {
      type: 'cart'
    },
    computed: {
      itemsInCart: () => [expectedItem],
      itemsInWishlist: () => []
    },
    store: storeMocks.store,
    localVue
  }

  beforeEach(() => {
    cart = shallowMount(Cart, options)
    wishlist = shallowMount(Cart,
      { 
        ...options,
        propsData: { type: 'wishlist' },
        computed: {
          itemsInCart: () => [],
          itemsInWishlist: () => [expectedItem]
        }
      }
    )
  })

  it('does not allow any other type prop expect cart or wishlist', () => {
    expect(cart.vm.$options.props.type.validator('cart')).toBe(true)
    expect(cart.vm.$options.props.type.validator('wishlist')).toBe(true)
    expect(cart.vm.$options.props.type.validator('somwthingWrong')).toBe(false)
  })

  it('renders product in cart correctly', () => {
    expect(cart.find('.product-in-cart__title').text()).toEqual(cart.vm.items[0].title)
    expect(wishlist.find('.product-in-cart__title').text()).toEqual(wishlist.vm.items[0].title)
  })

  it('return products depending of type correctly', () => {
    expect(cart.vm.items).toEqual([expectedItem])
    expect(wishlist.vm.items).toEqual([expectedItem])
  })

  it('removes product from cart/wishlist correctly', () => {
    cart.find('.remove-button').trigger('click')
    expect(storeMocks.mutations.removeFromCart).toBeCalled()
    expect(storeMocks.mutations.addToCart).not.toBeCalled()

    wishlist.find('.remove-button').trigger('click')
    expect(storeMocks.mutations.removeFromWishlist).toBeCalled()
    expect(storeMocks.mutations.addToWishlist).not.toBeCalled()
  })

  it('moves product to wishlist/cart correctly', () => {
    cart.find('.move-to-button').trigger('click')
    expect(storeMocks.mutations.removeFromCart).toBeCalled()
    expect(storeMocks.mutations.addToWishlist).toBeCalled()

    wishlist.find('.move-to-button').trigger('click')
    expect(storeMocks.mutations.removeFromWishlist).toBeCalled()
    expect(storeMocks.mutations.addToWishlist).toBeCalled()
  })

  it('doesn\'t render move button if product is already in wishlist/cart', () => {
    cart = shallowMount(Cart, {
      ...options,
      computed: {
        itemsInCart: () => [expectedItem],
        itemsInWishlist: () => [expectedItem]
      }
    })
    expect(cart.find('.move-to-button').exists()).toBeFalsy()

    wishlist = shallowMount(Cart, {
      ...options,
      propsData: { type: 'wishlist ' },
      computed: {
        itemsInCart: () => [expectedItem],
        itemsInWishlist: () => [expectedItem]
      }
    })
    expect(cart.find('.move-to-button').exists()).toBeFalsy()
  })

  it('detects item in cart/wishlist correctly', () => {
    expect(cart.vm.isItemInCart(expectedItem)).toBe(true)
    expect(wishlist.vm.isItemInCart(expectedItem)).toBe(false)

    expect(cart.vm.isItemInWishlist(expectedItem)).toBe(false)
    expect(wishlist.vm.isItemInWishlist(expectedItem)).toBe(true)
  })

  it('shows right total sum in cart', () => {
    cart = shallowMount(Cart, {
      ...options,
      computed: {
        itemsInCart: () => [expectedItem, expectedItem, expectedItem],
        itemsInWishlist: () => []
      }
    })
    const sum = cart.find('.total-amount').text()
    const expectedSum = cart.vm.items.reduce((prev, cur) => prev + cur.retail_price.value, 0)
    const expectedSumFormatted = '€ ' + expectedSum.toFixed(2)
    expect(sum).toEqual(expectedSumFormatted)
  })
})
