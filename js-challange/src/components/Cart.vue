<template>
    <div class="cart" v-if="items.length">
        <div v-for="item in items" :key="item.uuid" class="product-in-cart__container">
            <div class="product-in-cart__image-container">
                <img class="product__image" :src="`${item.cover_image_url}?q=60&fit=crop&w=100`" :alt="item.title" itemprop="image"/>
            </div>
            <div>
                <div>{{ item.title }}</div>
                <div>{{ item.retail_price.formatted_value }}</div>
            </div>
            <div @click="removeFromCart(item)" class="remove-btn">x</div>
        </div>
        {{ total }}
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Cart',
  computed: {
      items () {
          return this.$store.state.itemsInCart
      },
      total () {
          return this.items.reduce((acc, item) => acc + item.retail_price.value, 0);
      }
  },
  methods: {
    ...mapMutations([
      'removeFromCart'
    ]),
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cart {
    width: 300px;
    border: 1px solid grey;
    position: absolute;
    right: 10px;
    background: white;
    z-index: 9;
    padding: 10px;
}
.product-in-cart__container {
    display: flex;
    padding-bottom: 10px;
}
.product-in-cart__image-container {
    padding-right: 10px;
}

.remove-btn {
    cursor: pointer;
    color: red;
    font-size: 20px;
    align-self: center;
    padding: 0 10px;
}
</style>
