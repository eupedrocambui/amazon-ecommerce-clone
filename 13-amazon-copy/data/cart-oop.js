// Practicing OOP

/* Default cart for testing 
export let cart = [{deliveryOptionId: "1",
productId: "id1",
quantity: 1
}, {deliveryOptionId: "2",
productId: "id2",
quantity: 3
}];*/

function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,
    
    // function of cart variable (loaded using localStorage or an empty array)
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    },

    // local function to save the cart using localStorage
    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    // add to cart function
    addToCart(productId, selectQuantity, matchingItem) {
      this.cartItems.forEach((item) => { 
          if (productId === item.productId) { // matching item verifier
            matchingItem = item;
          }
        })
      if (matchingItem) { // if there is matching item
        matchingItem.quantity += selectQuantity;
      } else { // if there is not matching item
        this.cartItems.push({
          productId: productId,
          quantity: selectQuantity,
          deliveryOptionId: '1'
        });
      }

      this.saveToStorage();
    },

    // remove from cart function
    removeFromCart(productId) {
      let newCart = [];

      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      })

      this.cartItems = newCart;
      this.saveToStorage();
    },

    // updates the cart quantity of an item
    updateItemQuantity(productId, newQuantity) {
      this.cartItems.forEach((item) => {
        if (item.productId === productId) {
          item.quantity = newQuantity;
          this.saveToStorage();
        }
      })
    },

    // returns the current total cart quantity
    calculateCartQuantity() { 
      let cartQuantity = 0;
      this.cartItems.forEach((item) => {
          cartQuantity += item.quantity;
        });
      return cartQuantity;
    },

    // updates the current cart quantity at the header on checkout page
    updateHeaderCheckoutCartQuantity() { 
      let cartQuantityHeader = calculateCartQuantity();
      document.querySelector('.js-header-cart-quantity').innerHTML = `${cartQuantityHeader} Items`;
    },

    // changes the delivery option in checkout (radio input)
    updateDeliveryOption(productId, deliveryOptionId) {
      // verify if productId is not in the cart (the function will return)
      let counter = 0;
      this.cartItems.forEach((item) => {
        if (productId !== item.productId) {
            counter++;
          }
      });
      if (counter === this.cartItems.length) {
        return
      }

      let matchingItem;
      this.cartItems.forEach((item) => { 
          if (productId === item.productId) { // matching item verifier
            matchingItem = item;
          }
        })
      matchingItem.deliveryOptionId = deliveryOptionId;

      this.saveToStorage();
    }
  };

  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');


cart.loadFromStorage();
businessCart.loadFromStorage();

cart.addToCart('id1', 4, 0);

console.log(cart);
console.log(businessCart);
