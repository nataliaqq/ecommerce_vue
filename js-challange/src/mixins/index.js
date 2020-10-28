var mixin = {
    computed: {
        itemsInCart () {
            return this.$store.state.itemsInCart
        },
        itemsInWishlist () {
            return this.$store.state.itemsInWishlist
        },
        totalPrice () {
            return this.itemsInCart.reduce((acc, item) => acc + item.retail_price.value, 0);
        }
    },
    filters: {
        money (value) {
            return '€ ' + value.toFixed(2)
        }
    }
}

export default mixin;