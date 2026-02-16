/*
    finds the matching product in products array using a productId
    matching product has all product data
*/ 
export function findMatchingProduct(productId, products) {
    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    })

    return matchingProduct;
}
