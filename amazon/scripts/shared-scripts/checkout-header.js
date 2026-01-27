import { checkoutHeaderLoaded } from "../events/events.js";

const checkoutHeaderHTML =
`
    <div class="header-content">
        <div class="checkout-header-left-section">
            <a href="index.html">
                <img class="amazon-logo" src="images/amazon-logo.png">
                <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
            </a>
        </div>

        <div class="checkout-header-middle-section js-checkout-header-middle-section">
            Checkout (<a class="return-to-home-link js-header-cart-quantity js-cart-quantity"
            href="index.html">0 Items</a>)
        </div>

        <div class="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png">
        </div>
    </div>
`;

document.querySelector(".checkout-header").innerHTML = checkoutHeaderHTML;
checkoutHeaderLoaded();