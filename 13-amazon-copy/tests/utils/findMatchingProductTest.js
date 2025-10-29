import { loadProductsFetch, products } from "../../data/products.js";
import { findMatchingProduct } from "../../scripts/utils/findMatchingProduct.js";


describe('test suite: findMatchingProduct', () => {
    it('finds the matching product in products array', async () => {
        await loadProductsFetch();
        
        // Black and Gray Athletic Cotton Socks - 6 Pairs
        const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
        // Intermediate Size Basketball
        const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

        let matchingProduct = findMatchingProduct(productId1, products);
        expect(matchingProduct.id).toEqual(productId1);
        expect(matchingProduct.name).toEqual(
            'Black and Gray Athletic Cotton Socks - 6 Pairs'
        );

        matchingProduct = findMatchingProduct(productId2, products);
        expect(matchingProduct.id).toEqual(productId2);
        expect(matchingProduct.name).toEqual(
            'Intermediate Size Basketball'
        );
    });
});
