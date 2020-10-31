import { createLocalVue, shallowMount } from '@vue/test-utils'
import App from '../../App.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('App', () => {
  let store
  let app

  beforeEach(() => {
    store = new Vuex.Store()
    app = shallowMount(App, {
      store,
      localVue
    })
  })

  it('renders without errors', () => {
    expect(app.vm).toBeTruthy()
  })
})
