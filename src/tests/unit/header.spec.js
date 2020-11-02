import Vuex from 'vuex'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Header from '../../components/Header'
import { __createMocks as createStoreMocks } from '../../store'

jest.mock('../../store')

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
    expect(header.vm.cartHover).toBe(false)
    header.vm.setCartHover(true)
   
    expect(header.vm.cartHover).toBe(true)
  })

  it('changes cartHover data when hover bag', () => {
    expect(header.vm.wishlistHover).toBe(false)
    header.vm.setWishlistHover(true)
   
    expect(header.vm.wishlistHover).toBe(true)
  })
})
