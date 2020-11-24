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

.product-list__item {
    padding: 10px;
    flex: 1 0 33.3333%;
    max-width: 33.3333%;
}

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

.product__image-wrapper {
    padding: 20px;
    position: relative;
    text-align: center;
}

.product__image {
    max-width: 100%;
    height: auto;
}
.product {
    display: flex;
    flex-direction: column;
    height: 100%;

    background-color: #ffffff;
}
.product__title {
    padding-bottom: 10px;

    font-family: 'Lato-Bold', sans-serif;
    font-size: 14px;
    letter-spacing: 1.37px;
    text-transform: uppercase;
}

.product__subtitle {
    padding-bottom: 10px;

    font-size: 12px;
    line-height: 19px;
    letter-spacing: 0.43px;

    color: #808080;
}

.product__details {
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    padding: 10px 20px 20px;
    text-align: center;
}

.product__wishlist-button {
    .item-in-wishlist {
      fill: white;
    }

    width: 35px;
    height: 35px;

    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 10px;
    right: 10px;

    outline: none;
}

.button--wishlist:hover {
    border: 1px solid #444A59;
}

.button--wishlist:hover > .icon {
    fill: #444A59;
}

.product__add-to-cart {
    width: 100%;
    margin-top: 10px;
    margin-top: auto;
}
.product__price {
    padding-bottom: 20px;

    font-family: 'Lato-Bold', sans-serif;
    font-size: 14px;
    letter-spacing: 2.33px;
}

.product__price--strike {
    margin-right: 10px;
    text-decoration: line-through;
}

.product__price--discounted {
    color: #F54B5E;
}

</style>
