import { calculateCartQuantity } from "../../data/cart.js";

/*
    displays checkout header middle section "Checkout (2 Items)"
    checks if there is 1 item and displays "1 Item" instead of "1 Itens"
*/ 
export function checkoutMiddleSection() {
    const cartQuantity = calculateCartQuantity();
    const itemsString = (cartQuantity === 1) ? 'Item' : 'Items';  // "1 Item" or "2 Items" string
    const checkoutHeaderHTML = 
    `
        Checkout (<a class="return-to-home-link js-header-cart-quantity"
            href="index.html">${cartQuantity} ${itemsString}</a>)
    `;

    document.querySelector('.js-checkout-header-middle-section').innerHTML = checkoutHeaderHTML;
}
