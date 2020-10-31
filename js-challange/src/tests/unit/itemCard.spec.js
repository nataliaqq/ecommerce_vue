import Vuex from 'vuex'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import ItemCard from '../../components/ItemCard'
import { expectedItem } from './expectedData'

import { __createMocks as createStoreMocks } from '../../store'

jest.mock('../../store');

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ItemCard', () => {
  let itemCard

  const storeMocks = createStoreMocks();

  const options = {
    propsData: {
      item: expectedItem,
    },
    computed: {
      itemsInCart: () => [],
      itemsInWishlist: () => []
    },
    store: storeMocks.store,
    localVue
  }

  beforeEach(() => {
    itemCard = shallowMount(ItemCard, options)
  });

  it('product renders correctly', () => {
    expect(itemCard.find('.product__title').text()).toEqual(itemCard.props().item.title)
  })

  it('adds item to cart by button click', () => {
    itemCard.find('.product__add-to-cart').trigger('click')
    expect(storeMocks.mutations.addToCart).toBeCalled()
    expect(storeMocks.mutations.removeFromCart).not.toBeCalled()
  })
  
  it('adds item to wishlist by button click', () => {
    itemCard.find('.product__wishlist-button').trigger('click')
    expect(storeMocks.mutations.addToWishlist).toBeCalled()
    expect(storeMocks.mutations.removeFromWishlist).not.toBeCalled()
  })

  it('removes item from cart by button click', () => {
    itemCard = shallowMount(ItemCard, {
      ...options,
      computed: {
        itemsInCart: () => [expectedItem],
        itemsInWishlist: () => []
      }
    })

    itemCard.vm.$nextTick().then(() => {
      itemCard.find('.product__add-to-cart').trigger('click')
      expect(storeMocks.mutations.removeFromCart).toBeCalled()
      expect(storeMocks.mutations.addToCart).not.toBeCalled()
    }).catch(() => {
    })
  })

  it('removes item from cart by button click', () => {
    itemCard = shallowMount(ItemCard, {
      ...options,
      computed: {
        itemsInCart: () => [],
        itemsInWishlist: () => [expectedItem]
      }
    })

    itemCard.vm.$nextTick().then(() => {
      itemCard.find('.product__wishlist-button').trigger('click')
      expect(storeMocks.mutations.removeFromWishlist).toBeCalled()
      expect(storeMocks.mutations.addToWishlist).not.toBeCalled()
    }).catch(() => {
    })
  })
})
  