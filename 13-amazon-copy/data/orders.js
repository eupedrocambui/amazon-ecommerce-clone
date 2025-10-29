// load orders from localStorage
export const orders = JSON.parse(localStorage.getItem('orders')) || [];

// add order to orders array
export function addOrder(order) {
    orders.unshift(order);
    saveToStorage();
}

// save orders array in localStorage
function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}
