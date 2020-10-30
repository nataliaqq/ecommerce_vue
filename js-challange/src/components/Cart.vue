<template>
    <div class="cart" v-if="items && items.length">
        <div class="title">
            <span v-if="type === 'cart'">Your cart</span>
            <span v-if="type === 'wishlist'">Your wishlit</span>
        </div>
        <div v-for="item in items" :key="item.uuid" class="product-in-cart__container">
            <div class="product-in-cart__image-container">
                <img class="product__image" :src="`${item.cover_image_url}?q=60&fit=crop&w=200`" :alt="item.title" itemprop="image"/>
            </div>
            <div>
                <div class="product-in-cart__title trunc-3">{{ item.title }}</div>
                <div class="price">{{ item.retail_price.formatted_value }}</div>
            </div>

            <div @click="remove(item)" class="remove-button"></div>

            <div v-if="!isItemInCart(item)" @click="moveToCart(item)" class="move-to-button"><BagIcon color="white" /></div>
            <div v-if="!isItemInWishlist(item)" @click="moveToWishlist(item)" class="move-to-button"><WishlistIcon color="white" /></div>

        </div>

        <div class="total" v-if="type === 'cart'">
            <div>Total:</div>
            <div class="total-amount">{{ totalPrice | money }}</div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

import mixin from '../mixins'

import BagIcon from '../assets/svg/bag'
import WishlistIcon from '../assets/svg/wishlist'

export default {
  name: 'Cart',
  mixins: [mixin],
  components: {
    BagIcon,
    WishlistIcon
  },
  props: {
    type: {
      type: String,
      default: 'cart'
    }
  },
  computed: {
    items () {
      return this.type === 'wishlist' ? this.itemsInWishlist : this.itemsInCart
    }
  },
  methods: {
    ...mapMutations([
      'addToCart',
      'addToWishlist',
      'removeFromCart',
      'removeFromWishlist'
    ]),
    remove (item) {
      if (this.type === 'cart') this.removeFromCart(item)
      if (this.type === 'wishlist') this.removeFromWishlist(item)
    },
    moveToWishlist (item) {
      this.addToWishlist(item)
      this.removeFromCart(item)
    },
    moveToCart (item) {
      this.addToCart(item)
      this.removeFromWishlist(item)
    },
    isItemInCart (item) {
      return !!this.itemsInCart.find(itemInCart => itemInCart.uuid === item.uuid)
    },
    isItemInWishlist (item) {
      return !!this.itemsInWishlist.find(itemInWishlist => itemInWishlist.uuid === item.uuid)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.cart {
    width: 90%;
    max-width: 500px;
    border: 1px solid lightgrey;
    position: absolute;
    right: 10px;
    top: 50px;
    background: white;
    z-index: 9;
}
.title {
    padding: 20px;
    font-size: 20px;
}
.cart__action-buttons {
    display: flex;
    flex-basis: 150px;
    flex-direction: column;
    align-items: center;
    .move-to {
      font-size: 12px;
      text-decoration: underline;
    }
}

.product-in-cart__container {
    display: flex;
    align-items: center;
    padding: 15px 50px 15px 20px;
    position: relative;
    &:nth-child(2n) {
        background-color: #ececec;
    }
}

.product-in-cart__image-container {
    flex-basis: 200px;
    padding-right: 10px;
    min-width: 100px;
}

.remove-button {
    background: white;
    padding: 10px;
    width: 37px;
    height: 37px;
    position: absolute;
    top: 10px;
    right: 0;
    cursor: pointer;
}

.move-to-button {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 37px;
    height: 37px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(165, 165, 165);
    cursor: pointer;
}

.remove-button {
    &:after,
    &:before {
        content: '';
        height: 20px;
        border-left: 2px solid red;
        position: absolute;
        left: 17px;
    }
    &:after {
      transform: rotate(45deg);
    }
    &:before {
      transform: rotate(-45deg);
    }
}

.price {
    font-weight: bold;
}

.total {
    font-size: 14px;
    padding: 20px;
    border-top: 1px solid lightgray;
    display: flex;
    width: 100%;
    justify-content: space-between;
}

.total-amount {
    font-weight: bold;
}

.trunc-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
