<template>
    <header class="header container">
        <h1 class="page-title">BRAND</h1>
        <aside class="header-bag">
            <div class="header-bag__item header-bag__count" @mouseover="mouseoverCart" @mouseleave="mouseleaveCart">
                <div class="header-bag__price">
                    {{ totalPrice | money }}
                </div>
                <img :src="bagIcon">
                <span class="bag__item-counter">{{ itemsInCart.length }}</span>
            </div>
            <div class="header-bag__item header-bag__wishlist-count" @mouseover="mouseoverWishlist" @mouseleave="mouseleaveWishlist">
                <WishlistIcon />
                <span class="bag__item-counter">{{ itemsInWishlist.length }}</span>
            </div>
        </aside>
    </header>
</template>

<script>

import Bag from '../assets/svg/bag.svg';
import WishlistIcon from '../assets/svg/wishlist';
import mixin from '../mixins';

export default {
  name: 'Header',
  mixins: [mixin],
  data () {
    return {
        bagIcon: Bag,
    }
  },
  components: {
      WishlistIcon
  },
  computed: {
      itemsInWishlist () {
        return this.$store.state.itemsInWishlist
      }
  },
  methods: {
      mouseoverCart () {
          this.$emit('setCartHover', true)
      },
      mouseleaveCart () {
          this.$emit('setCartHover', false)
      },
      mouseoverWishlist () {
          this.$emit('setWishlistHover', true)
      },
      mouseleaveWishlist () {
          this.$emit('setWishlistHover', false)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header-bag__item {
    cursor: pointer;
}
.header-bag__price {
    padding-right: 10px;
}
</style>
