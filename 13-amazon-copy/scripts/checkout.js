import { cart, removeFromCart, updateDeliveryOption, updateItemQuantity } from '../data/cart.js'; 
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { updateHeaderCheckoutCartQuantity } from '../data/cart.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

console.log(cart);

// display header checkout cart quantity as the page is started
updateHeaderCheckoutCartQuantity();

// generates the cart html at checkout page
let cartSummaryHTML = '';
cart.forEach((cartItem) => {
    let productId = cartItem.productId; // cart product id

    let matchingItem;
    products.forEach((product) => {
        if (product.id === productId) {
            matchingItem = product;
        }
    });

    let deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    })

    let today = dayjs();
    let deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    let dateString = deliveryDate.format('dddd, MMMM D');



    cartSummaryHTML += 
    `
    <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
        <div class="delivery-date">
            Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingItem.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingItem.name}
            </div>
            <div class="product-price">
                $${formatCurrency(matchingItem.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-button" data-product-id="${matchingItem.id}">
                Update
                </span>

                <span class="js-input-quantity-update"></span>
                <span class="js-link-save-update"></span> 

                <span class="delete-quantity-link link-primary js-delete-button" data-product-id="${matchingItem.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingItem, cartItem)}
            </div>
        </div>
        </div>
    `;
});

// delivery options HTML
function deliveryOptionsHTML(matchingItem, cartItem) {
    let deliverySumary = '';

    deliveryOptions.forEach((deliveryOption) => {
    let today = dayjs();
    let deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    let dateString = deliveryDate.format('dddd, MMMM D');

    let deliveryPrice;
    if (deliveryOption.priceCents === 0) {
        deliveryPrice = 'FREE';
    } else {
        deliveryPrice = formatCurrency(deliveryOption.priceCents);
    }
    
    let isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    deliverySumary += 
    `<div class="delivery-option js-delivery-option" data-product-id="${matchingItem.id}" data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
        ${isChecked ? 'checked' : ''}
        class="delivery-option-input"
        name="delivery-option-${matchingItem.id}">
        <div>
        <div class="delivery-option-date">
            ${dateString}
        </div>
        <div class="delivery-option-price">
            $${deliveryPrice} - Shipping
        </div>
        </div>
    </div>`;
    })

    console.log(deliverySumary);
    return deliverySumary;
}



// display the cart html at checkout page
document.querySelector('.js-summary').innerHTML = cartSummaryHTML;

// addEventListeners for all delete buttons at checkout page
document.querySelectorAll('.js-delete-button').forEach((link) => {
    link.addEventListener('click', () => {
        let productId = link.dataset.productId;
        removeFromCart(productId);
        let container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
        updateHeaderCheckoutCartQuantity();
    })
});

// addEventListeners for all update buttons at checkout page
document.querySelectorAll('.js-update-button').forEach((link) => {
    link.addEventListener('click', () => {
        let productId = link.dataset.productId;
        let quantityInputElem = document.querySelector('.js-input-quantity-update');
        let saveLinkElem = document.querySelector('.js-link-save-update');

        // quantity input appears when clicking 'update'
        quantityInputElem.innerHTML = '<input class="quantity-input">'; 

        // save link appears when clicking 'update'
        saveLinkElem.innerHTML = '<span class="save-quantity-link link-primary">Save</span>';

        // update link dessapears when clicking 'update' (itself)
        link.innerHTML = '';

        // addEventListener for save link 
        saveLinkElem.addEventListener('click', () => {
            let newQuantity = Number(document.querySelector('.quantity-input').value); // get the value from quantityInput
            if (newQuantity > 0 && newQuantity < 1000) {
                let quantityLabelElem = document.querySelector('.quantity-label');
                updateItemQuantity(productId, newQuantity); // updates the cart item quantity
                updateHeaderCheckoutCartQuantity();
                quantityLabelElem.innerHTML = newQuantity;

                // display the update link again and dessapears the input and save elements
                link.innerHTML = 'Update';
                document.querySelector('.js-input-quantity-update').innerHTML = '';
                document.querySelector('.js-link-save-update').innerHTML = '';
            } else {
                alert('Invalid quantity, try again');
            } 
        })

        // onKeyDown for pressing Enter when updating the quantity
        document.querySelector('.quantity-input').addEventListener('keydown', (event) => {
            // updates the item quantity (in same way as clicking 'save')
            if (event.key === 'Enter') {
                let newQuantity = Number(document.querySelector('.quantity-input').value);
                if (newQuantity > 0 && newQuantity < 1000) {
                    let quantityLabelElem = document.querySelector('.quantity-label');
                    updateItemQuantity(productId, newQuantity);
                    updateHeaderCheckoutCartQuantity();
                    quantityLabelElem.innerHTML = newQuantity;
                    link.innerHTML = 'Update';
                    document.querySelector('.js-input-quantity-update').innerHTML = '';
                    document.querySelector('.js-link-save-update').innerHTML = '';
                } else {
                    alert('Invalid quantity, try again');
                } 
            }
        })
    })
})


document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
        let productId = element.dataset.productId;
        let deliveryOptionId = element.dataset.deliveryOptionId;
        updateDeliveryOption(productId, deliveryOptionId);
    })
})