export function findMatchingProduct(productId, products) {
    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    })

    return matchingProduct;
}
