import { createLocalVue, shallowMount } from '@vue/test-utils'
import App from '../../App.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('App', () => {
    let store

    beforeEach(() => {
        store = new Vuex.Store()
      })
    
    it('renders without errors', () => {
        const wrapper = shallowMount(App, {
          store,
          localVue
        })
        expect(wrapper.vm).toBeTruthy()
      })
  })
  