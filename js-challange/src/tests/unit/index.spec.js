import { createLocalVue, shallowMount } from '@vue/test-utils'
import App from '../../App.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)


describe('Mounted App', () => {
    let actions
    let store

    beforeEach(() => {
        actions = {
          openConfirmationModelAction: jest.fn(),
          sendUserDateViaEmail: jest.fn()
        }
        store = new Vuex.Store({
          actions
        })
      })
    
    it('renders without errors', () => {
        const msg = 6
        const wrapper = shallowMount(App, {
          store,
          localVue
        })
        expect(wrapper.isVueInstance()).toBeTruthy()
      })
  })
  