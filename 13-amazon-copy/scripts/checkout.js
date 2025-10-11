import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { Car } from "../data/car.js";

// display header checkout cart quantity as the page is started
renderCheckoutHeader();

// renders the order summary (items), generates all HTML
renderOrderSummary();

// renders the order summary (payment)
renderPaymentSummary();