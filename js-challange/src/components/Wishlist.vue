<template>
    <div class="cart" v-if="items && items.length">
        <div class="title">In your wishlist</div>
        <div v-for="item in items" :key="item.uuid" class="product-in-cart__container">
            <div class="product-in-cart__image-container">
                <img class="product__image" :src="`${item.cover_image_url}?q=60&fit=crop&w=200`" :alt="item.title" itemprop="image"/>
            </div>
            <div>
                <div class="trunc-3">{{ item.title }}</div>
                <div class="price">{{ item.retail_price.formatted_value }}</div>
            </div>
            <div @click="removeFromWishlist(item)" class="remove-btn">x</div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Wishlist',
  computed: {
      items () {
          return this.$store.state.itemsInWishlist
      },
      total () {
          return this.items.reduce((acc, item) => acc + item.retail_price.value, 0);
      }
  },
  methods: {
    ...mapMutations([
      'removeFromWishlist'
    ]),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cart {
    width: 350px;
    border: 1px solid lightgrey;
    position: absolute;
    right: 10px;
    background: white;
    z-index: 9;
}
.title {
    padding: 20px;
    font-size: 20px;
}
.product-in-cart__container {
    display: flex;
    padding: 15px 20px;
}
.product-in-cart__container:nth-child(2n) {
    background-color: #ececec;
}
.product-in-cart__image-container {
    flex-basis: 200px;
    padding-right: 10px;
    min-width: 100px;
}

.remove-btn {
    cursor: pointer;
    color: red;
    font-size: 20px;
    align-self: center;
    padding: 0 10px;
}

.price {
    font-weight: bold;
}

.trunc-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
