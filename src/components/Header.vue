<template>
    <header>
        <div class="container header">
            <h1 class="page-title">BRAND</h1>
            <aside class="header-bag">
                <div id="header-item-bag" class="header-item-wrapper" @mouseover="setCartHover(true)" @mouseleave="setCartHover(false)">
                    <div class="header-bag__item header-bag__count">
                        <div class="header-bag__price">
                            {{ totalPrice | money }}
                        </div>
                        <BagIcon />
                        <span class="bag__item-counter">{{ itemsInCart.length }}</span>
                    </div>
                    <Cart
                        v-show="cartHover"
                    />
                </div>
                <div id="header-item-wishlist" class="header-item-wrapper" @mouseover="setWishlistHover(true)" @mouseleave="setWishlistHover(false)">
                    <div class="header-bag__item header-bag__wishlist-count">
                        <WishlistIcon />
                        <span class="bag__item-counter">{{ itemsInWishlist.length }}</span>
                    </div>
                    <Cart
                        v-show="wishlistHover"
                        type="wishlist"
                    />
                </div>
            </aside>
        </div>
    </header>
</template>

<script>
import Cart from './Cart'
import BagIcon from '../assets/svg/bag'
import WishlistIcon from '../assets/svg/wishlist'
import mixin from '../mixins'

export default {
  name: 'Header',
  components: {
    BagIcon,
    Cart,
    WishlistIcon
  },
  mixins: [mixin],
  data () {
    return {
      cartHover: false,
      wishlistHover: false
    }
  },
  methods: {
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

.page-title {
    font-size: 20px;
}

header {
    position: fixed;
    z-index: 1;
    top: 0;
    width: 100%;
    padding: 0 40px;
    margin: 0 auto;
}
.header {
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

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

.bag__item-counter {
    width: 13px;
    height: 13px;
    margin-left: -1px;

    display: flex;
    align-self: flex-start;
    justify-content: center;
    align-items: center;

    font-family: 'Lato-Bold', sans-serif;
    font-size: 8px;
    text-align: center;

    border-radius: 50%;
    color: #ffffff;
    background-color: #358ED7;
}

.header-bag {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
}

.header-bag__item {
    height: 25px;

    display: flex;
    align-items: flex-end;
}

.header-bag__item .icon {
    height: auto;
    fill: #444A59;
}

.header-bag__price {
    margin-right: 5px;
    font-size: 12px;
    line-height: 12px;
}

.header-bag__count {
    margin-left: 10px;
}

.header-bag__count .icon {
    width: 17px;
}

.header-bag__wishlist-count {
    margin-left: 10px;
}

</style>
