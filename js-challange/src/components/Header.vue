<template>
    <header class="header container">
        <h1 class="page-title">BRAND</h1>
        <aside class="header-bag">
            <div class="header-bag__item header-bag__count" @mouseover="mouseover" @mouseleave="mouseleave">
                <div class="header-bag__price">
                    {{ totalPrice }}
                </div>
                <img :src="bagIcon">
                <span class="bag__item-counter">{{ itemsInCart.length }}</span>
            </div>
            <div class="header-bag__item header-bag__wishlist-count">
                <img :src="wishlistIcon">
                <span class="bag__item-counter">{{ totalWishlist }}</span>
            </div>
        </aside>
    </header>
</template>

<script>

import Bag from '../assets/svg/bag.svg';
import Wishlist from '../assets/svg/wishlist.svg';

export default {
  name: 'Header',
  data () {
    return {
        totalPrice: 0,
        totalWishlist: 0,
        bagIcon: Bag,
        wishlistIcon: Wishlist
    }
  },
  computed: {
      itemsInCart () {
          return this.$store.state.itemsInCart
      },
  },
  methods: {
      mouseover () {
          this.$emit('setCartHover', true)
      },
      mouseleave () {
          this.$emit('setCartHover', false)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header-bag__item {
    cursor: pointer;
}
</style>
