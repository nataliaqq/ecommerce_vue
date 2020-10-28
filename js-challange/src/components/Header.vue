<template>
    <header class="header container">
        <h1 class="page-title">BRAND</h1>
        <aside class="header-bag">
            <div class="header-item-wrapper" @mouseover="setCartHover(true)" @mouseleave="setCartHover(false)">
                <div class="header-bag__item header-bag__count">
                    <div class="header-bag__price">
                        {{ totalPrice | money }}
                    </div>
                    <img :src="bagIcon">
                    <span class="bag__item-counter">{{ itemsInCart.length }}</span>
                </div>
                <Cart
                    v-show="cartHover"
                    :items="$store.state.itemsInCart"
                    @removeItem="removeFromCart"
                    title="Your cart"
                />
            </div>
            <div class="header-item-wrapper" @mouseover="setWishlistHover(true)" @mouseleave="setWishlistHover(false)">
                <div class="header-bag__item header-bag__wishlist-count">
                    <WishlistIcon />
                    <span class="bag__item-counter">{{ itemsInWishlist.length }}</span>
                </div>
                 <Cart
                    v-show="wishlistHover"
                    :items="$store.state.itemsInWishlist"
                    @removeItem="removeFromWishlist"
                    title="In your wishlist"
                    :showTotal="false"
                />
            </div>
        </aside>
    </header>
</template>

<script>

import Bag from '../assets/svg/bag.svg';
import Cart from './Cart';
import WishlistIcon from '../assets/svg/wishlist';
import mixin from '../mixins';
import { mapMutations } from 'vuex';

export default {
  name: 'Header',
  mixins: [mixin],
  data () {
    return {
        bagIcon: Bag,

        cartHover: false,
        wishlistHover: false
    }
  },
  components: {
      Cart,
      WishlistIcon
  },
  methods: {
    ...mapMutations([
      'removeFromCart',
      'removeFromWishlist'
    ]),
    setCartHover (hover) {
      this.cartHover = hover
    },
    setWishlistHover (hover) {
      this.wishlistHover = hover
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
aside {
    height: 100%;
    align-items: center;
}
.header-bag__item {
    cursor: pointer;
}
.header-bag__price {
    padding-right: 10px;
}
.header-item-wrapper {
    height: 100%;
    display: flex;
    align-items: center;
}
</style>
