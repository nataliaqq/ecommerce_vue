<template>
  <div>
    <Header 
      @setCartHover="setCartHover"
      @setWishlistHover="setWishlistHover"
    />
    <Cart v-show="cartHover" />
    <Wishlist v-show="wishlistHover" />
    <main class="product-page">
      <div class="container">
        <ul class="product-list">
          <ItemCard
            :item="item"
            v-for="item in data"
            :key="item.uuid" />
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
import Wishlist from './Wishlist'
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
  computed: {
    itemsInCart () {
      return this.$store.state.itemsInCart
    }
  },
  components: {
    Cart,
    ItemCard,
    Pagination,
    Footer,
    Header,
    Wishlist
  },
  methods: {
    loadPage (page) {
      let offset = (page - 1) * this.itemsPerPage
      restService.getStore({ limit: this.itemsPerPage, offset: offset }).then(res => {
        this.data = res?.data || []
      })
    },
    setCartHover (hover) {
      this.cartHover = hover
    },
    setWishlistHover (hover) {
      this.wishlistHover = hover
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
