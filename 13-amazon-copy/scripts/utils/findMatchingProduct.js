// finds the matching product (all product data) in products array using a productId
export function findMatchingProduct(productId, products) {
    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    })

    return matchingProduct;
}
