import { updateHeaderCheckoutCartQuantity } from "../data/cart.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

// display header checkout cart quantity as the page is started
updateHeaderCheckoutCartQuantity();

// renders the order summary (items), generates all HTML
renderOrderSummary();

// renders the order summary (payment)
renderPaymentSummary();