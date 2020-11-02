import { createLocalVue, shallowMount } from '@vue/test-utils'
import Main from '../../components/Main.vue'
import Vuex from 'vuex'

import { expectedData } from './expectedData'

const localVue = createLocalVue()

describe('Main', () => {
  let main
  beforeEach(() => {
    main = shallowMount(Main, {
      data () {
        return {
          data: expectedData
        }
      },
      localVue
    })
  })

  it('renders without errors', () => {
    expect(main.vm).toBeTruthy()
  })

  it('load data', () => {
    expect(main.html()).toContain('<ul class="product-list">')
  })
})
