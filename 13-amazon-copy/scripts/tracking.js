import { calculateCartQuantity } from "../data/cart.js";

// Main function to load tracking HTML
function renderTrackingHTML() {
  // Getting productData from local storage
  const productData = JSON.parse(localStorage.getItem('productData'));
  
  // Destructuring productData
  const { deliveryDate, productName, quantity, imageLink, progressPercent, status } = productData;
  
  // Generating HTML
  let trackingSummaryHTML = 
  `
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        Arriving on ${deliveryDate}
      </div>

      <div class="product-info">
        ${productName}
      </div>

      <div class="product-info">
        Quantity: ${quantity}
      </div>

      <img class="product-image" src="${imageLink}">

      <div class="progress-labels-container">
        <div class="progress-label ${status === '1' ? 'current-status' : ''}">
          Preparing
        </div>
        <div class="progress-label ${status === '2' ? 'current-status' : ''}">
          Shipped
        </div>
        <div class="progress-label ${status === '3' ? 'current-status' : ''}">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar" data-progress-percent="${progressPercent}"></div>
      </div>
  `;

  return trackingSummaryHTML;
}



// Render tracking page HTML
const finalHTML = renderTrackingHTML();
document.querySelector('.order-tracking').innerHTML = finalHTML;

// Setting progress bar width
const progressBarElem = document.querySelector('.progress-bar');
let progressPercent = progressBarElem.dataset.progressPercent;
console.log(progressPercent);
progressBarElem.style.width = `${progressPercent}%`;

// Refreshing cart quantity
document.addEventListener('headerLoaded', () => {
  const cartQuantityTrackingElem = document.querySelector('.js-cart-quantity');
  cartQuantityTrackingElem.innerHTML = calculateCartQuantity();
});
