import { checkoutMiddleSection } from "./checkout/headerMiddleSection.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { cart, emptyCartMessage } from "../data/cart.js";
import { mainLoaded } from "./events/events.js";

async function loadPage() {
    await loadProductsFetch();
    
    checkoutMiddleSection();

    // if empty cart
    if (cart.length === 0) {
        emptyCartMessage();
        return;
    }

    renderOrderSummary();
    renderPaymentSummary();
    mainLoaded();
}

loadPage();