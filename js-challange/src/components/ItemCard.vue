<template>
    <li class="product-list__item">
      <article class="product" itemscope itemtype="http://schema.org/Product">
          <figure class="product__image-wrapper">
              <img class="product__image" :src="`${item.cover_image_url}?q=60&fit=crop&w=300`" :alt="item.title" itemprop="image"/>
              <button class="product__wishlist-button button button--round button--wishlist">
                <img :src="wishlistIcon">
              </button>
          </figure>
          <div class="product__details">
              <h1 class="product__title" itemprop="brand">{{ item.title }}</h1>
              <p class="product__subtitle" itemprop="description">{{ item.description }}</p>
              <div class="product__price" itemscope itemtype="http://schema.org/Offer">
                  <span class="product__price--strike" v-if="isDiscounted(item)">{{ item.retail_price.formatted_value }}</span>
                  <span :class="isDiscounted(item) ? 'product__price--discounted' : 'product__price'" itemprop="price">{{ getPrice(item) }}</span>
              </div>
              <button class="product__add-to-cart button button--primary">Add to Cart</button>
          </div>
      </article>
  </li>
</template>

<script>
import Wishlist from '../assets/svg/wishlist.svg';

export default {
  name: 'ItemCard',
  data () {
    return {
      wishlistIcon: Wishlist
    }
  },
  // @TODO props validation
  props: {
    item: Object
  },
  methods: {
    isDiscounted (item) {
      return item?.discount > 0
    },
    getPrice (item) {
      // if discount prop is greather than 0, full price is net_price.formatted_value (to be shown as striked) and final price will be retail_price.formatted_value -->
      return this.isDiscounted(item) ? item?.net_price?.formatted_value : item?.retail_price?.formatted_value
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
