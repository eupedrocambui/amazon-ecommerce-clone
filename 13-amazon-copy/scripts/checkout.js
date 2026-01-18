import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";

async function loadPage() {
    await Promise.all([
        loadProductsFetch(),
        loadCartFetch()
    ]);
    
    // displays header checkout cart quantity when the page is started
    renderCheckoutHeader();

    // renders order summary (items in checkout page)
    renderOrderSummary();

    // renders the order summary (payment section in checkout)
    renderPaymentSummary();

    // dispatch mainLoaded event
    document.dispatchEvent(new Event('mainLoaded'));
}

loadPage();


