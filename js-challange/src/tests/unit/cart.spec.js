import Vuex from 'vuex'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Cart from '../../components/Cart'
import { expectedItem } from './expectedData'

import { __createMocks as createStoreMocks } from '../../store'

jest.mock('../../store');

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Cart', () => {
  let cart
  let props
  let storeMocks

  beforeEach(() => {
      storeMocks = createStoreMocks();

      cart = shallowMount(Cart, {
        propsData: {
            type: 'cart'
        },
        computed: {
          itemsInCart: () => [expectedItem],
          itemsInWishlist: () => []
        },
        store: storeMocks.store,
        localVue
      })
  });

  it('product in cart renders correctly', () => {
    expect(cart.find('.product-in-cart__title').text()).toEqual(cart.vm.items[0].title)
  })

  it('product can be removed from cart correctly', () => {
    cart.find('.remove-button').trigger('click')
    expect(storeMocks.mutations.removeFromCart).toBeCalled() 
  })
  it('product can be moved to wishlist correctly', () => {
    cart.find('.move-to-button').trigger('click')
    cart.vm.$nextTick().then(() => {
        expect(cart.vm.items).toEqual([])
    })
  })
  it('if product is already in wishlist there is no move button', () => {
    cart = shallowMount(Cart, {
        propsData: props,
        computed: {
          itemsInCart: () => [expectedItem],
          itemsInWishlist: () => [expectedItem]
        },
        store: storeMocks,
        localVue
      })
    expect(cart.contains('.move-to-button')).toBe(false)
  })
});
  