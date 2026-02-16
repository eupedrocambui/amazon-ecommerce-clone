/*
  loads orders from localStorage
  if orders doesn't exist yet, it will be and empty array
*/
export const orders = JSON.parse(localStorage.getItem('orders')) || [];

// creates order after clicking "place your order" on checkout page
export function addOrder(order) {
    orders.unshift(order);
    saveToStorage();
}

// save orders in localStorage
function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}
