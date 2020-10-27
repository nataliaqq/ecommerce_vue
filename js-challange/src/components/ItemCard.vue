<template>
    <li class="product-list__item">
      <article class="product" itemscope itemtype="http://schema.org/Product">
          <figure class="product__image-wrapper">
              <img class="product__image" :src="`${item.cover_image_url}?q=60&fit=crop&w=300`" :alt="item.title" itemprop="image"/>
              <button class="product__wishlist-button button button--round button--wishlist">
                  <svg class="icon" width="20px" height="20px" viewBox="0 6 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <title>Wishlist Icon</title>
                      <polygon id="Wishlist-Icon" stroke="none" fill-rule="evenodd" points="12.3598869 13.2675869 20 13.2675869 13.8200565 17.7545318 16.1782804 25.0221187 9.99833694 20.5318477 3.81839348 25.0221187 6.17994346 17.7545318 0 13.2675869 7.63678696 13.2675869 9.99833694 6"></polygon>
                  </svg>
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
export default {
  name: 'ItemCard',
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
