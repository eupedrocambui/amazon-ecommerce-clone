import { updateHeaderCheckoutCartQuantity } from "../data/cart.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

// display header checkout cart quantity as the page is started
//updateHeaderCheckoutCartQuantity();
renderCheckoutHeader();

// renders the order summary (items), generates all HTML
renderOrderSummary();

// renders the order summary (payment)
renderPaymentSummary();