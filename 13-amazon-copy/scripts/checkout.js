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
    
    // display header checkout cart quantity as the page is started
    renderCheckoutHeader();

    // renders the order summary (items), generates all HTML
    renderOrderSummary();

    // renders the order summary (payment)
    renderPaymentSummary();
}

loadPage();

/*Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(resolve);
    })
]).then((values) => {
    console.log(values);

    // display header checkout cart quantity as the page is started
    renderCheckoutHeader();

    // renders the order summary (items), generates all HTML
    renderOrderSummary();

    // renders the order summary (payment)
    renderPaymentSummary();
})*/
