import { calculateCartQuantity } from "../../data/cart.js";

// displays header checkout cart quantity when the page is started
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
