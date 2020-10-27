<template>
  <div>
    <main class="product-page">
      <div class="container">
        <ul class="product-list">
          <ItemCard :item="item" v-for="item in data" :key="item.uuid"/>
        </ul>
        <Pagination @loadPage="loadPage"/>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import ItemCard from './ItemCard'
import Footer from './Footer'
import Pagination from './Pagination'
import restService from '../api/service'

export default {
  name: 'Main',
  data () {
    return {
      data: [],
      itemsPerPage: 6,
    }
  },
  components: {
    ItemCard,
    Pagination,
    Footer
  },
  methods: {
    loadPage (page) {
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
