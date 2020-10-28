<template>
  <li class="product-list__item">
    <article class="product" itemscope itemtype="http://schema.org/Product">
        <figure class="product__image-wrapper">
            <img class="product__image" :src="`${item.cover_image_url}?q=60&fit=crop&w=300`" :alt="item.title" itemprop="image"/>
            <button class="product__wishlist-button button button--round button--wishlist" @click="isItemInWishlist(item) ? removeFromWishlist(item) : addToWishlist(item)">
              <WishlistIcon :color="isItemInWishlist(item) ? null : 'lightgrey'" />
            </button>
        </figure>
        <div class="product__details">
            <h1 class="product__title" itemprop="brand">{{ item.title }}</h1>
            <p class="product__subtitle" itemprop="description">{{ item.description }}</p>
            <div class="product__price" itemscope itemtype="http://schema.org/Offer">
                <span class="product__price--strike" v-if="isDiscounted(item)">{{ item.retail_price.formatted_value }}</span>
                <span :class="isDiscounted(item) ? 'product__price--discounted' : 'product__price'" itemprop="price">{{ getPrice(item) }}</span>
            </div>
            <button class="product__add-to-cart button button--primary" :class="isItemInCart(item) ? 'item-in-cart' : ''" @click="isItemInCart(item) ? removeToCart(item) : addToCart(item)">
              {{ isItemInCart(item) ? 'Remove from Cart' : 'Add to Cart' }}
            </button>
        </div>
    </article>
  </li>
</template>

<script>
import { mapMutations } from 'vuex'

import WishlistIcon from '../assets/svg/wishlist';

export default {
  name: 'ItemCard',
  components: {
    WishlistIcon
  },
  computed: {
    itemsInCart () {
      return this.$store.state.itemsInCart
    },
    itemsInWishlist () {
      return this.$store.state.itemsInWishlist
    }
  },
  // @TODO props validation
  props: {
    item: Object,
  },
  methods: {
    ...mapMutations([
      'addToCart',
      'removeFromCart',
      'addToWishlist',
      'removeFromWishlist'
    ]),
    isDiscounted (item) {
      return item?.discount > 0
    },
    getPrice (item) {
      // if discount prop is greather than 0, full price is net_price.formatted_value (to be shown as striked) and final price will be retail_price.formatted_value -->
      return this.isDiscounted(item) ? item?.net_price?.formatted_value : item?.retail_price?.formatted_value
    },
    isItemInCart (item) {
      return !!this.itemsInCart.find(itemInCart => itemInCart.uuid === item.uuid)
    },
    isItemInWishlist (item) {
      return !!this.itemsInWishlist.find(itemInWishlist => itemInWishlist.uuid === item.uuid)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button.item-in-cart {
    border: 1px solid #444A59;
    color: #ffffff;
    background-color: #444A59;
}
.product__wishlist-button.item-in-wishlist {
  fill: white;
}
</style>
