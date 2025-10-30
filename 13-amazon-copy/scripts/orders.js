import { addToCart, calculateCartQuantity } from "../data/cart.js";
import { orders } from "../data/orders.js";
import { loadProductsFetch, products } from "../data/products.js";
import { addBusinessDays } from "./utils/addBusinessDays.js";
import { findGap } from "./utils/findGapDate.js";
import { findMatchingProduct } from "./utils/findMatchingProduct.js";
import { formatDate, formatDate2, formatDate3 } from "./utils/formatDate.js";
import { formatCurrency } from "./utils/money.js";

// refreshes the cart quantity icon in orders page header
function displayCartQuantityOrders() {
    const cartQuantityOrdersElem = document.querySelector(
        '.js-cart-quantity-orders'
    );
    cartQuantityOrdersElem.innerHTML = calculateCartQuantity();
}

// added animation when clicking buy it again
function addedAnimation(orderId, productId) {
    let addedElem = document.querySelector(`.js-buy-it-again-${orderId}-${productId}`);
    addedElem.innerHTML = 'Added';

    if (addedElem.timeoutId) {
      clearTimeout(addedElem.timeoutId);
    }
    addedElem.timeoutId = setTimeout(() => addedElem.innerHTML = `
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
    `, 2000);
}

// generates order page HTML
async function renderOrdersHTML() {
    let ordersSummaryHTML = '';

    for (const order of orders) {
        const orderId = order.id;
        const orderTime = formatDate(order.orderTime);
        const totalCostCents = order.totalCostCents;
        const orderProducts = order.products;
       
        const productsHTML = await getProductsGridHTML(orderProducts, orderId);
       
        ordersSummaryHTML += 
        `
        <div class="order-container">
            <div class="order-header">
                <div class="order-header-left-section">
                <div class="order-date">
                    <div class="order-header-label">Order Placed:</div>
                    <div>${orderTime}</div>
                </div>
                <div class="order-total">
                    <div class="order-header-label">Total:</div>
                    <div>$${formatCurrency(totalCostCents)}</div>
                </div>
                </div>

                <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${orderId}</div>
                </div>
            </div>

            <div class="order-details-grid">
                ${productsHTML}
            </div>
            </div>
        `;
    }

    // generates orders products HTML
    async function getProductsGridHTML(orderProducts, orderId) {
        let productsGridHtml = '';
        await loadProductsFetch();

        orderProducts.forEach((product) => {
            const productId = product.productId;
            const quantity = product.quantity;
            const orderTime = formatDate2(product.orderTime);
            const estimatedDeliveryTime = formatDate2(product.estimatedDeliveryTime);

            const dateGap = findGap(orderTime, estimatedDeliveryTime);
    
            let deliveryDate = addBusinessDays(orderTime, dateGap);
            deliveryDate = formatDate3(deliveryDate);

            const matchingProduct = findMatchingProduct(productId, products);

            const productImageLink = matchingProduct.image;
            const productName = matchingProduct.name;

            productsGridHtml+=
            `
            <div class="product-image-container">
                <img src="${productImageLink}">
                    </div>

                    <div class="product-details">
                    <div class="product-name">
                        ${productName}
                    </div>
                    <div class="product-delivery-date">
                        Arriving on: ${deliveryDate}
                    </div>
                    <div class="product-quantity">
                        Quantity: ${quantity}
                    </div>
                    <button class="buy-again-button button-primary js-buy-it-again
                    js-buy-it-again-${orderId}-${productId}"

                    data-product-id="${productId}"
                    data-quantity="${quantity}"
                    data-order-id="${orderId}">
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                    </button>
                    </div>

                    <div class="product-actions">
                    <a href="tracking.html">
                        <button class="track-package-button button-secondary">
                        Track package
                        </button>
                    </a>
                    </div>
            `;
        })

        return productsGridHtml;
    }

    return ordersSummaryHTML;
}

// generates orders HTML
const finalHTML = async () => {
    const response = await renderOrdersHTML();
    return response;
}

finalHTML().then((response) => {
    document.querySelector('.js-orders-grid').innerHTML = response;

    // header cart quantity
    displayCartQuantityOrders();
    
    // Buy it Again buttons
    const buyItAgainElems = document.querySelectorAll('.js-buy-it-again');
    buyItAgainElems.forEach((buyItAgainButton) => {
        buyItAgainButton.addEventListener('click', () => {
            const orderId = buyItAgainButton.dataset.orderId;
            const productId = buyItAgainButton.dataset.productId;
            addedAnimation(orderId, productId);

            const quantity = Number(buyItAgainButton.dataset.quantity);

            let matchingItem;
            addToCart(productId, quantity, matchingItem);

            displayCartQuantityOrders();
        });
    });
})
