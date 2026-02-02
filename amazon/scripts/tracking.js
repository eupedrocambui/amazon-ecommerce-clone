import { displayCartQuantity } from "../data/cart.js";
import { mainLoaded } from "./events/events.js";
import { searchBar } from "./utils/searchBar.js";

/*
  progress percent is calculated on orders.js using calculateProgressPercent
  function (from trackingUtils.js) and placed in progress bar HTML element
  using dataset
*/
function progressBar() {
  const progressBarElem = document.querySelector('.progress-bar');
  let progressPercent = progressBarElem.dataset.progressPercent;
  progressBarElem.style.width = `${progressPercent}%`;
}

function renderTrackingHTML() {
  // getting productData from local storage
  const productData = JSON.parse(localStorage.getItem('productData'));
  
  // destructuring productData
  const { deliveryDate, productName, quantity, imageLink, progressPercent, status } = productData;
  
  // generating HTML
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

// tracking page HTML
const finalHTML = renderTrackingHTML();
document.querySelector('.order-tracking').innerHTML = finalHTML;

// setting progress bar width
progressBar();

// refreshing cart quantity
displayCartQuantity();

// interactive search bar
searchBar();

// dispatch mainLoaded event
mainLoaded();
