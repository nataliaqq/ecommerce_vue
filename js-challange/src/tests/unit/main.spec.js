import { createLocalVue, shallowMount } from '@vue/test-utils'
import Main from '../../components/Main.vue'
import Vuex from 'vuex'

import { expectedData } from './expectedData'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Main', () => {
    it('renders without errors', () => {
      const wrapper = shallowMount(Main, {
        localVue
      })
      expect(wrapper.vm).toBeTruthy()
    })

    it('load data', () => {
      const wrapper = shallowMount(Main, {
        data () {
          return {
            data: expectedData
          }
        },
        localVue
      })

      expect(wrapper.html()).toContain('<ul class="product-list">')
    })
})
  