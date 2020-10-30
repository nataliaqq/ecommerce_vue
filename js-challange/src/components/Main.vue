<template>
  <div>
    <Header />
    <main class="product-page">
      <div class="container">
        <ul class="product-list" v-if="data && data.length">
          <ItemCard
            :item="item"
            v-for="item in data"
            :key="item.uuid" />
        </ul>
        <Loader v-if="!data || !data.length" />
        <Pagination @loadPage="loadPage"/>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import ItemCard from './ItemCard'
import Header from './Header'
import Footer from './Footer'
import Loader from './Loader'
import Pagination from './Pagination'
import restService from '../api/service'
import { itemsPerPage } from '../constants'

export default {
  name: 'Main',
  components: {
    ItemCard,
    Pagination,
    Footer,
    Header,
    Loader
  },
  data () {
    return {
      data: [],

      cartHover: false,
      wishlistHover: false
    }
  },
  methods: {
    loadPage (page) {
      this.resetData()

      const offset = (page - 1) * itemsPerPage
      this.callData({ limit: itemsPerPage, offset: offset })
    },
    callData (params) {
      restService.getStore({ limit: params?.limit, offset: params?.offset })
      
      .then(res => {
        this.data = res?.data || []
      })
    },
    resetData () {
      this.data = []
    }
  },

  mounted () {
    this.callData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
