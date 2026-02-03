import { loadFromStorage, cart } from '../../data/cart.js';
import { loadProductsFetch } from '../../data/products.js';
import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js';

describe('test suite: renderOrderSummary', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';  // Black and Gray Athletic Cotton Socks - 6 Pairs
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';  // Intermediate Size Basketball
    
    beforeAll(async () => {
        await loadProductsFetch();  // loading products
    });

    beforeEach(() => {
        // injecting page structure
        document.querySelector('.js-test-container').innerHTML =
        `    
            <div class="js-checkout-header-middle-section"></div>
            <div class="main"></div>
        `;

        // replacing setItem and getItem with spy
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {deliveryOptionId: "1",
                productId: productId1,
                quantity: 2}, 
                {deliveryOptionId: "2",
                productId: productId2,
                quantity: 3}
            ])
        });

        loadFromStorage();
        renderOrderSummary();
    });
    
    afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = '';  // cleaning HTML
    });
    
    it('displays the cart', () => {
        // checking quantity
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
        expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');
        expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 3'); 

        // checking products
        expect(document.querySelector(`.js-product-name-${productId1}`).innerText).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
        expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toEqual('Intermediate Size Basketball');

        // checking prices
        expect(document.querySelector(`.js-product-price-${productId1}`).innerText).toEqual('$10.90');
        expect(document.querySelector(`.js-product-price-${productId2}`).innerText).toEqual('$20.95');
    });

    it('removes a product from the cart', () => {
        // deleting product and rendering order summary
        document.querySelector(`.js-delete-button-${productId1}`).click(); 
        renderOrderSummary();

        // checking cart length
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
        expect(cart.length).toEqual(1); 

        // checking produts
        expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
        expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);
        expect(cart[0].productId).toEqual(productId2);
        expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toEqual('Intermediate Size Basketball');

        // checking prices
        expect(document.querySelector(`.js-product-price-${productId2}`).innerText).toEqual('$20.95');
    });
});

describe('test suite: updateDeliveryOption (checkout)', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';  // Black and Gray Athletic Cotton Socks - 6 Pairs
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';  // Intermediate Size Basketball
    
    beforeAll(async () => {
        await loadProductsFetch();  // loading products
    });

    beforeEach(() => {
        // injecting page structure
        document.querySelector('.js-test-container').innerHTML = 
        `
            <div class="main"></div>
        `;

        // replacing setItem and getItem with spy
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {deliveryOptionId: "1",
                productId: productId1,
                quantity: 2}, 
                {deliveryOptionId: "2",
                productId: productId2,
                quantity: 3}
            ])
        });

        loadFromStorage();
        renderOrderSummary();
    });

    afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = '';  // cleaning HTML
    });
    
    it('updates the delivery option', () => {
        // checking input radio 1 before updating
        expect(document.querySelector('.js-input-e43638ce-6aa0-4b85-b27f-e1d07eb678c6-1').checked).toEqual(true);

        // updating delivery option (1 -> 3)
        document.querySelector('.js-delivery-e43638ce-6aa0-4b85-b27f-e1d07eb678c6-3').click();

        // checking input radio 3 after updating
        expect(document.querySelector('.js-input-e43638ce-6aa0-4b85-b27f-e1d07eb678c6-3').checked).toEqual(true);
        
        expect(cart.length).toEqual(2);  // quantity
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');  // checking product
        expect(cart[0].deliveryOptionId).toEqual('3');  // checking delivery option
        expect(document.querySelector('.js-shipping-total').innerText).toEqual('$14.98');  // price
    });
});
