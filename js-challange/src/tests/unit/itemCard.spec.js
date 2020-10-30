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
  let props
  let storeMocks

  beforeEach(() => {
      storeMocks = createStoreMocks();

      itemCard = shallowMount(ItemCard, {
        propsData: {
          item: expectedItem,
        },
        computed: {
          itemsInCart: () => [],
          itemsInWishlist: () => []
        },
        store: storeMocks.store,
        localVue
      })
  });

  it('product renders correctly', () => {
    expect(itemCard.find('.product__title').text()).toEqual(itemCard.props().item.title)
  })

  it('adds item to cart by button click', () => {
    itemCard.find('.product__add-to-cart').trigger('click')
    expect(storeMocks.mutations.addToCart).toBeCalled()
  })

  it('removes item from cart by button click', () => {
    itemCard = shallowMount(ItemCard, {
      propsData: props,
      computed: {
        itemsInCart: () => [expectedItem],
        itemsInWishlist: () => []
      },
      store: storeMocks,
      localVue
    })

    itemCard.vm.$nextTick().then(() => {
      itemCard.find('.product__add-to-cart').trigger('click')
      expect(storeMocks.mutations.removeFromCart).toBeCalled()
    });
  })

  it('adds item to wishlist by button click', () => {
    itemCard.find('.product__wishlist-button').trigger('click')
    expect(storeMocks.mutations.addToWishlist).toBeCalled()
  })

  it('removes item from cart by button click', () => {
    itemCard = shallowMount(ItemCard, {
      propsData: props,
      computed: {
        itemsInCart: () => [],
        itemsInWishlist: () => [expectedItem]
      },
      store: storeMocks,
      localVue
    })

    itemCard.vm.$nextTick().then(() => {
      itemCard.find('.product__wishlist-button').trigger('click')
      expect(storeMocks.mutations.removeFromWishlist).toBeCalled()
    });
  })
});
  