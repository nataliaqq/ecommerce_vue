<template>
  <li class="product-list__item" v-if="item">
    <article class="product" itemscope itemtype="http://schema.org/Product">
        <figure class="product__image-wrapper" v-if="item.cover_image_url">
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
            <button class="product__add-to-cart button button--primary" :class="isItemInCart(item) ? 'item-in-cart' : ''" @click="isItemInCart(item) ? removeFromCart(item) : addToCart(item)">
              {{ isItemInCart(item) ? 'Remove from Cart' : 'Add to Cart' }}
            </button>
        </div>
    </article>
  </li>
</template>

<script>
/**
 * The product card
 * It shows image, title, description,
 * price of product and CTA (add/remove to/from cart).
 */
import { mapMutations } from 'vuex'
import mixin from '../mixins'
import WishlistIcon from '../assets/svg/wishlist'

export default {
  name: 'ItemCard',
  mixins: [mixin],
  components: {
    WishlistIcon
  },
  props: {
    /**
    * Single product object
    */
    item: {
      type: Object,
      default () {
        return {}
      }
    }
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
    /**
     * if discount prop is greather than 0,
     * full price is net_price.formatted_value (to be shown as striked)
     * and final price will be retail_price.formatted_value
     */
    getPrice (item) {
      return this.isDiscounted(item) ? item?.net_price?.formatted_value : item?.retail_price?.formatted_value
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
.button {
  &:focus {
    outline: none;
  }
}
.item-in-cart {
    &.button {
      border: 1px solid #444A59;
      color: #ffffff;
      background-color: #444A59;
    }
}
.product__wishlist-button {
  .item-in-wishlist {
    fill: white;
  }
}

.product-list__item {
  @media (max-width: 768px) {
    flex: 1 0 50%;
    max-width: 50%;
  }
  @media (max-width: 560px) {
    flex: 1 0 100%;
    max-width: 100%;
  }
}

</style>