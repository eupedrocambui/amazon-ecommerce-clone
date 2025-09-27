/* Default cart for testing 
export let cart = [{deliveryOptionId: "1",
productId: "id1",
quantity: 1
}, {deliveryOptionId: "2",
productId: "id2",
quantity: 3
}];*/

export let cart;

loadFromStorage();

// function of cart variable (loaded using localStorage or an empty array)
export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
}

export function updateItemQuantity(productId, newQuantity) {
  cart.forEach((item) => {
    if (item.productId === productId) {
      item.quantity = newQuantity;
      saveToStorage();
    }
  })
}

// returns the current total cart quantity
export function calculateCartQuantity() { 
  let cartQuantity = 0;
  cart.forEach((item) => {
      cartQuantity += item.quantity;
    });
  return cartQuantity;
}

// updates the current cart quantity at the header on checkout page
export function updateHeaderCheckoutCartQuantity() { 
    let cartQuantityHeader = calculateCartQuantity();
    document.querySelector('.js-header-cart-quantity').innerHTML = `${cartQuantityHeader} Items`;
}

// local function to save the cart using localStorage
function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// add to cart function
export function addToCart(productId, selectQuantity, matchingItem) {
  cart.forEach((item) => { 
      if (productId === item.productId) { // matching item verifier
        matchingItem = item;
      }
    })
  if (matchingItem) { // if there is matching item
    matchingItem.quantity += selectQuantity;
  } else { // if there is not matching item
    cart.push({
      productId: productId,
      quantity: selectQuantity,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

// remove from cart function
export function removeFromCart(productId) {
  let newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  })

  cart = newCart;
  saveToStorage();
}

// changes the delivery option in checkout (radio input)
export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((item) => { 
      if (productId === item.productId) { // matching item verifier
        matchingItem = item;
      }
    })
  
  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}
