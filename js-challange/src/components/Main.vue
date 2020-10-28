<template>
  <div>
    <Header 
      @setCartHover="setCartHover"
      @setWishlistHover="setWishlistHover"
    />
    <Cart
      v-show="cartHover"
      :items="$store.state.itemsInCart"
      @removeItem="removeFromCart"
      title="Your cart"
    />
    <Cart
      v-show="wishlistHover"
      :items="$store.state.itemsInWishlist"
      @removeItem="removeFromWishlist"
      title="In your wishlist"
      :showTotal="false"
    />
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
import restService from '../api/service'
import { mapMutations } from 'vuex'
import mixin from '../mixins'

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
  mixins: [mixin],
  components: {
    Cart,
    ItemCard,
    Pagination,
    Footer,
    Header
  },
  methods: {
    ...mapMutations([
      'removeFromCart',
      'removeFromWishlist'
    ]),
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
