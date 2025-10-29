import { calculateCartQuantity, cart } from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { addOrder } from "../../data/orders.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";

// renders the order summary (payment section in checkout)
export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;

    cart.forEach((cartItem) => {
        let matchingItem;
        products.forEach((product) => {
            if (product.id === cartItem.productId) {
                matchingItem = product;
            }
        })
        productPriceCents += matchingItem.priceCents * cartItem.quantity;

        let deliveryOption;
        deliveryOptions.forEach((option) => {
            if (option.id === cartItem.deliveryOptionId) {
                deliveryOption = option;
            }
        })
        shippingPriceCents += deliveryOption.priceCents;
    })

    let totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    let taxCents = totalBeforeTaxCents * 0.1;
    let totalCents = totalBeforeTaxCents + taxCents;


    let paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${calculateCartQuantity()}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money js-shipping-total">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
    `;

    let paymentSummaryElem = document.querySelector('.js-payment-summary');
    paymentSummaryElem.innerHTML = paymentSummaryHTML;

    // "Place your order" checkout button
    const placeOrderElem = document.querySelector('.js-place-order');
    placeOrderElem.addEventListener('click', async () => {
      try {
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart: cart
          })
        });

        const order = await response.json();
        addOrder(order);
        localStorage.removeItem('cart');
        localStorage.setItem('cart', '[]');

      } catch (error) {
        console.log('catch error (place your order button)', error);
      }

      window.location.href = 'orders.html';
    });
}
