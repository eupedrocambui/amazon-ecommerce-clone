import { mainLoaded } from "../scripts/events/events.js";

export let cart;
loadFromStorage();

/*
  loads cart from localStorage
  if cart doesn't exist yet, it will be and empty array
*/
export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
}

// changes item quantity directly on checkout page
export function updateItemQuantity(productId, newQuantity) {
  cart.forEach((item) => {
    if (item.productId === productId) {
      item.quantity = newQuantity;
      saveToStorage();
    }
  })
}

// returns the current cart quantity
export function calculateCartQuantity() { 
  let cartQuantity = 0;
  cart.forEach((item) => {
      cartQuantity += item.quantity;
    });
  return cartQuantity;
}

// displays the current cart quantity
export function displayCartQuantity() { 
  document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();
}

// saves cart in localStorage
function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// add products after clicking "add to cart" button on home page
export function addToCart(productId, selectQuantity) {
  let matchingItem;

  cart.forEach((item) => { 
      if (productId === item.productId) { // checking if product is already in cart
        matchingItem = item;
      }
    })

  if (matchingItem) { 
    matchingItem.quantity += selectQuantity; // if product exists in cart, just update quantity
  } else { 
    cart.push({ // if product doesn't exist yet, add it
      productId: productId,
      quantity: selectQuantity,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

// remove products after clicking "delete" button on checkout page
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
  // verifying if productId doesn't exist in cart
  let counter = 0;
  cart.forEach((item) => {
    if (productId !== item.productId) {
        counter++;
      }
  });
  if (counter === cart.length) {
    return
  }

  let matchingItem;
  cart.forEach((item) => { 
      if (productId === item.productId) { // matching item verifier
        matchingItem = item;
      }
    })
  
  matchingItem.deliveryOptionId = deliveryOptionId; // changing delivery option

  saveToStorage();
}

/*
  displays this message when user tries to
  open checkout page with empty cart
*/
export function emptyCartMessage() {
  document.querySelector('.main').innerHTML = 
  `
    <div class="empty-cart-container">
      <h1>Your Cart is Waiting</h1>
      <p>Your cart is currently empty. Start shopping to add products.</p>
      <a href="index.html">Find Products</a>
    </div>
  `;

  // dispatch mainLoaded event
  mainLoaded();
}