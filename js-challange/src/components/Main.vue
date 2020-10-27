<template>
  <div>
    <Header @setCartHover="setCartHover" />
    <Cart :items="itemsInCart" v-show="cartHover" />
    <main class="product-page">
      <div class="container">
        <ul class="product-list">
          <ItemCard
            :item="item"
            v-for="item in data"
            :key="item.uuid"
            @addToCart="addToCart"
            @removeFromCart="removeFromCart"
            :itemsInCart="itemsInCart" />
        </ul>
        <Pagination @loadPage="loadPage"/>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import ItemCard from './ItemCard'
import Cart from './Cart'
import Header from './Header'
import Footer from './Footer'
import Pagination from './Pagination'
import restService from '../api/service'

export default {
  name: 'Main',
  data () {
    return {
      data: [],
      itemsPerPage: 6,

      itemsInCart: [],

      cartHover: false
    }
  },
  components: {
    Cart,
    ItemCard,
    Pagination,
    Footer,
    Header
  },
  methods: {
    loadPage (page) {
      let offset = (page - 1) * this.itemsPerPage
      restService.getStore({ limit: this.itemsPerPage, offset: offset }).then(res => {
        this.data = res?.data || []
      })
    },
    addToCart (item) {
      this.itemsInCart.push(item)
    },
    removeFromCart (item) {
      const index = this.itemsInCart.findIndex(itemInCart => itemInCart.uuid === item.uuid)
      index > -1 ? this.itemsInCart.splice(index, 1) : false
    },
    setCartHover (hover) {
      this.cartHover = hover
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
