import { calculateCartQuantity } from "../../data/cart.js";
// js-checkout-header-middle-section

export function renderCheckoutHeader() {
    let cartQuantity = calculateCartQuantity();
    let checkoutHeaderHTML = 
    `
        Checkout (<a class="return-to-home-link js-header-cart-quantity"
            href="amazon.html">${cartQuantity} Items</a>)
    `;

    let checkoutHeaderElem = document.querySelector('.js-checkout-header-middle-section');
    checkoutHeaderElem.innerHTML = checkoutHeaderHTML;
}