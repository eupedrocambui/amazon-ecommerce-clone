import { updateHeaderCheckoutCartQuantity } from "../data/cart.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";

// display header checkout cart quantity as the page is started
updateHeaderCheckoutCartQuantity();

// renders the order summary (generates all HTML)
renderOrderSummary();