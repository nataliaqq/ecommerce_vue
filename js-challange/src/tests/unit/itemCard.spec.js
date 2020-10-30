import Vuex from 'vuex'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import ItemCard from '../../components/ItemCard'
import { expectedItem } from './expectedData'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ItemCard', () => {
  let itemCard
  let props
  let store
  let mutations

  beforeEach(() => {
      props = {
        item: expectedItem,
      }

      mutations = {
        addToCart: jest.fn(),
        removeFromCart: jest.fn(),
        addToWishlist: jest.fn(),
        removeFromWishlist: jest.fn(),
      }

      store = new Vuex.Store({
        mutations
      })

      itemCard = shallowMount(ItemCard, {
        propsData: props,
        computed: {
          itemsInCart: () => [],
          itemsInWishlist: () => []
        },
        store,
        localVue
      })
  });

  it('product renders correctly', () => {
    expect(itemCard.find('.product__title').text()).toEqual(itemCard.props().item.title)
  })

  it('adds item to cart by button click', () => {
    itemCard.find('.product__add-to-cart').trigger('click')
    expect(mutations.addToCart).toBeCalled()
  })

  it('removes item from cart by button click', () => {
    itemCard = shallowMount(ItemCard, {
      propsData: props,
      computed: {
        itemsInCart: () => [expectedItem],
        itemsInWishlist: () => []
      },
      store,
      localVue
    })

    itemCard.vm.$nextTick().then(() => {
      itemCard.find('.product__add-to-cart').trigger('click')
      expect(mutations.removeFromCart).toBeCalled()
    });
  })

  it('adds item to wishlist by button click', () => {
    itemCard.find('.product__wishlist-button').trigger('click')
    expect(mutations.addToWishlist).toBeCalled()
  })

  it('removes item from cart by button click', () => {
    itemCard = shallowMount(ItemCard, {
      propsData: props,
      computed: {
        itemsInCart: () => [],
        itemsInWishlist: () => [expectedItem]
      },
      store,
      localVue
    })

    itemCard.vm.$nextTick().then(() => {
      itemCard.find('.product__wishlist-button').trigger('click')
      expect(mutations.removeFromWishlist).toBeCalled()
    });
  })
});
  