<template>
  <div>
    <Header />
    <main class="product-page">
      <div class="container">
        <ul class="product-list" v-if="data">
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

export default {
  name: 'Main',
  data () {
    return {
      data: [],
      itemsPerPage: 6,

      cartHover: false,
      wishlistHover: false
    }
  },
  components: {
    ItemCard,
    Pagination,
    Footer,
    Header,
    Loader
  },
  methods: {
    loadPage (page) {
      this.data = []
      let offset = (page - 1) * this.itemsPerPage
      restService.getStore({ limit: this.itemsPerPage, offset: offset }).then(res => {
        this.data = res?.data || []
      })
    }
  },
  
  mounted () {
    restService.getStore().then(res => {
      this.data = res?.data || []
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
