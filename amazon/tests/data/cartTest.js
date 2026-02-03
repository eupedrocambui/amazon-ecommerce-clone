import { addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption } from "../../data/cart.js";

describe('test suite: addToCart', () => {

    beforeEach(() => {
        spyOn(localStorage, 'setItem');  // replacing setItem with spy
    });

    it('add a new product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {  // replacing getItem with spy (empty cart)
            return JSON.stringify([]);
        });
        loadFromStorage();
        
        addToCart('id1', 1);

        // checking cart
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('id1');
        expect(cart[0].quantity).toEqual(1);

        // checking if product was added
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
                productId: 'id1',
                quantity: 1,
                deliveryOptionId: "1"
            }]));
    });

    it('adds quantity for an existent cart product', () => {
        // replacing getItem with spy (cart with one product)
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'id1',
                quantity: 1,
                deliveryOptionId: '1'
            }])
        })
        loadFromStorage();

        addToCart('id1', 1);

        // checking cart
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('id1');
        expect(cart[0].quantity).toEqual(2);

        // checking quantity change
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
                productId: 'id1',
                quantity: 2,
                deliveryOptionId: '1'
            }]));
    });
});

describe('test suite: removeFromCart', () => {
    const productId1 = 'id1';
    const productId2 = 'id2';
    
    beforeEach(() => {
        // replacing setItem and getItem with spy 
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => { // fake cart with 2 products
            return JSON.stringify([
            {deliveryOptionId: "1",
            productId: "id1",
            quantity: 1
            }, {deliveryOptionId: "2",
            productId: "id2",
            quantity: 3
            }]);
        });
        loadFromStorage();
    });

    it('removes a cart product', () => {
        removeFromCart(productId1);

        // checking cart
        expect(cart[0].productId).toEqual(productId2);

        // checking cart change
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            deliveryOptionId: "2",
            productId: "id2",
            quantity: 3
            }]
        ));
    });

    it('removes a product that is not in the cart', () => {
        const response = removeFromCart('idNotExistent');

        expect(response).toBe('invalid productId');
        expect(cart[0].productId).toEqual(productId1);
        expect(cart[1].productId).toEqual(productId2);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
            {deliveryOptionId: "1",
            productId: "id1",
            quantity: 1
            }, {deliveryOptionId: "2",
            productId: "id2",
            quantity: 3
            }]
        ));
    });
});

describe('test suite: updateDeliveryOption', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {deliveryOptionId: "1",
                productId: 'id1',
                quantity: 2}, 
                {deliveryOptionId: "2",
                productId: 'id2',
                quantity: 3}
            ]);
        });
        loadFromStorage();
    });

    it('updates the delivery option', () => {
        updateDeliveryOption('id1', '3');

        expect(cart[0].deliveryOptionId).toEqual('3');
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
                {deliveryOptionId: "3",
                productId: 'id1',
                quantity: 2}, 
                {deliveryOptionId: "2",
                productId: 'id2',
                quantity: 3}
            ])
        );
    });

    it('doesnt call saveToStorage if the product is not in the cart', () => {
        updateDeliveryOption('idNotExistent', '2');

        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
        expect(JSON.stringify(cart)).toEqual(JSON.stringify([
                {deliveryOptionId: "1",
                productId: 'id1',
                quantity: 2}, 
                {deliveryOptionId: "2",
                productId: 'id2',
                quantity: 3}
            ])
        );
    })
});