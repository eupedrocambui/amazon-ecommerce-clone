import { loadFromStorage, cart } from '../../data/cart.js';
import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js';

describe('test suite: renderOrderSummary', () => {
    const productId1 = 'id1';
    const productId2 = 'id2';
    
    beforeEach(() => {
        document.querySelector('.js-test-container').innerHTML = 
        `
            <div class="js-summary"></div>
            <div class="js-checkout-header-middle-section"></div>
            <div class="js-payment-summary"></div>
        `;
        
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
        document.querySelector('.js-test-container').innerHTML = '';
    });

    it('displays the cart', () => {
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
        expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');
        expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 3'); 
    });

    it('removes a product from the cart', () => {
        document.querySelector(`.js-delete-button-${productId1}`).click();

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
        expect(
            document.querySelector(`.js-cart-item-container-${productId1}`)
        ).toEqual(null);
        expect(
            document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);
    });
})