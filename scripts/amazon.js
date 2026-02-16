import { addToCart, displayCartQuantity } from '../data/cart.js';
import { products, loadProductsFetch } from '../data/products.js';
import { mainLoaded } from './events/events.js';
import { searchBar } from './utils/searchBar.js';

// addedElemAnimation function variable
let timeoutId;

// "added" animation when clicking "add to cart" button
function addedElemAnimation(productId) { 
  let addedElem = document.querySelector(`.js-added-${productId}`);
    addedElem.classList.add('opacity');
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => addedElem.classList.remove('opacity'), 2000);
}

/*
  returns the current quantity on select element
  used when adding a product to cart
*/ 
function getSelectQuantity(productId) { 
  return Number(document.querySelector(`.js-select-${productId}`).value);
}

// when there is no result for user's search
function notFoundMessage() {
  const productsGridElem = document.querySelector('.products-grid');
  productsGridElem.innerHTML =
    ` <div class="not-found-container">
        <h1>No Results Found for your Search</h1>
        <p>Try checking the spelling or using more general terms.</p>
        <a href="index.html">Return to Home Page</a>
      </div>
    `;

  productsGridElem.style.display = "block";
    
  // dispatch mainLoaded event
  mainLoaded();
}

function renderProductsGrid() {
  // checking if zero products were found 
  if (products.length === 0) {
    notFoundMessage(); // not found message
    return;
  }

  let productsHTML = '';
  products.forEach((product) => {
      let html = `
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select class="js-select-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${product.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>
      `;

      productsHTML += html;
  });

  // injecting HTML
  document.querySelector('.products-grid').innerHTML = productsHTML;

  // "add to cart" buttons
  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      let productId = button.dataset.productId; // getting product id
      addedElemAnimation(productId); 

      let selectQuantity = getSelectQuantity(productId); // getting quantity using select element
      addToCart(productId, selectQuantity); 

      displayCartQuantity(); // displaying cart quantity after adding item to cart
    });
  });
}

// loading products
await loadProductsFetch();

// displays header cart quantity
displayCartQuantity();

// generates website HTML (products grid)
renderProductsGrid();

// interactive search bar
searchBar();

// dispatch mainLoaded event
mainLoaded();