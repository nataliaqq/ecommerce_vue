var mixin = {
  filters: {
    money (value) {
      return '€ ' + value.toFixed(2)
    }
  },
  computed: {
    itemsInCart () {
      return this.$store.state.itemsInCart
    },
    itemsInWishlist () {
      return this.$store.state.itemsInWishlist
    },
    totalPrice () {
      return this.itemsInCart.reduce((acc, item) => acc + item.retail_price.value, 0)
    }
  }
}

export default mixin
