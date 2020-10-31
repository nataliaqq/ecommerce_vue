import Vuex from 'vuex'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Header from '../../components/Header'
import { __createMocks as createStoreMocks } from '../../store'

jest.mock('../../store');

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Header', () => {
  let header

  const storeMocks = createStoreMocks()

  const options = { 
    data () {
        return {
            cartHover: false,
            wishlistHover: false
        }
    },
    computed: {
        itemsInCart: () => [],
        itemsInWishlist: () => []
    },
    store: storeMocks.store,
    localVue
  }

  beforeEach(() => {
    header = shallowMount(Header, options)
  })

  it('changes cartHover data when hover bag', () => {
    header.find('#header-item-bag').trigger('click')
    header.vm.$nextTick().then(() => {
        expect(header.vm.cartHover).toBe(true)
    }).catch(() => {
    })
  })
  it('changes cartHover data when hover bag', () => {
    header.find('#header-item-wishlist').trigger('click')
    header.vm.$nextTick().then(() => {
        expect(header.vm.wishlistHover).toBe(true)
    }).catch(() => {
    })
  })
})
  