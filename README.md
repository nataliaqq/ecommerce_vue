# js-challenge

This is the example of e-commerce application. You can add products to the cart or to wishlist (star symbol in the corner of product card).
Once item is added to wishlist or cart you can see that the counter is changed.

To see list of items in cart or wishlst hover the bag or star icon in the header. Small bag/wishlist should appear.

From the cart it's possible to move item from cart to the wishlist (star icon inside the cart) or viceversa (bag icon inside the wishlist)

If same product in the same time is presented in the cart and wishlist the option is not available.

## DEMO
I've deployed a demo from /dist folder here
https://determined-lumiere-6dee03.netlify.app

## Project setup
To install project
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run tests
```
npm test
```

### Components

#### Main
Main view component 

#### Cart

Can be used to show list of items.

#### ItemCard

Shows the product card with image, title, dedscription, 'add/remove to cart' button and 'add/remove to wishlist' button (star icon)

#### Pagination

Show pagination 

#### Loader

Appears when data is loading

#### Footer
#### Header