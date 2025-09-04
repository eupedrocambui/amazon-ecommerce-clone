export let cart = [];

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
}