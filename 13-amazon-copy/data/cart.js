export let cart = JSON.parse(localStorage.getItem('cart')) ||
[{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2
}, {
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1
}];

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

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
      quantity: selectQuantity
    });
  }

  saveToStorage();
}

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
