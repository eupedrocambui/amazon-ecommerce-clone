// imports
import { addToCart } from '../data/cart.js';
import { products, loadProductsFetch } from '../data/products.js';
import { calculateCartQuantity } from '../data/cart.js';

// global variables
let timeoutId;

// functions
function addedElemAnimation(productId) { // green 'added' element animation when clicking 'add to cart'
  let addedElem = document.querySelector(`.js-added-${productId}`);
    addedElem.classList.add('opacity');
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => addedElem.classList.remove('opacity'), 2000);
}

function getSelectQuantity(productId) { // returns the quantity on the current select element that is being used
  return Number(document.querySelector(`.js-select-${productId}`).value);
}

function updateCartQuantity() { // updates the cart quantity at the main page
  let cartQuantity = calculateCartQuantity();
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

// display cart quantity at main page as the page is started
updateCartQuantity();

// generate the website HTML (products)
await loadProductsFetch();
renderProductsGrid();

function renderProductsGrid() {
  // checking if zero products were found (not found message)
  if (products.length === 0) {
    const productsGridElem = document.querySelector('.products-grid');
    productsGridElem.innerHTML =
    ` <div class="not-found-container">
        <h1>No Results Found for your Search</h1>
        <p>Try checking the spelling or using more general terms.</p>
        <a href="amazon.html">Return to Home Page</a>
      </div>
    `;

    productsGridElem.style.display = "block";
    
    // dispatch mainLoaded event
    document.dispatchEvent(new Event('mainLoaded'));
    
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

  //
  document.querySelector('.products-grid').innerHTML = productsHTML;
  
  // dispatch mainLoaded event
  document.dispatchEvent(new Event('mainLoaded'));

  // addEventListener for all "add to cart" buttons
  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      let productId = button.dataset.productId; // define product id

      addedElemAnimation(productId); // added elem animation

      let selectQuantity = getSelectQuantity(productId); // define quantity by select element

      // add item to cart
      let matchingItem;
      addToCart(productId, selectQuantity, matchingItem);
      
      // update cart quantity (main page)
      let cartQuantity = 0;
      updateCartQuantity(cartQuantity);
    });
  });
}



// Search bar elements
const searchButtonElem = document.querySelector('.search-button');
const searchBarElem = document.querySelector('.search-bar');

// Search button click event listener
searchButtonElem.addEventListener('click', () => {
  const searchBarValue = searchBarElem.value;

  const params = new URLSearchParams({
    search: searchBarValue
  })

  window.location.href = `amazon.html?${params.toString()}`;
});

// Search bar enter keydown event listener
searchBarElem.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    searchButtonElem.click();
  }
});