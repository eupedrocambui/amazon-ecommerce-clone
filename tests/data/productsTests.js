import { Product, Clothing, Appliance } from "../../data/products.js";

describe('test suite: class Product', () => {
    let productExemple;

    beforeEach(() => {
        productExemple = new Product(
            {
                id: "id1",
                image: "images/products/backpack.jpg",
                name: "Backpack",
                rating: {
                stars: 5,
                count: 12345
                },
                priceCents: 9999,
                keywords: [
                "backpack",
                "school",
                "big"
                ]
            });
    });

    it('creates the object properly', () => {
        // checking properties
        expect(productExemple.id).toEqual("id1");
        expect(productExemple.image).toEqual("images/products/backpack.jpg")
        expect(productExemple.name).toEqual("Backpack");
    });

    it('runs all methods properly', () => {
        expect(productExemple.getStarsUrl()).toEqual('images/ratings/rating-50.png');
        expect(productExemple.getPrice()).toEqual('$99.99');
        expect(productExemple.extraInfoHTML()).toEqual('');
    })
});

describe('test suite: class Clothing', () => {
    let productExemple;

    beforeEach(() => {
        productExemple = new Clothing(
            {
                id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
                image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
                name: "Adults Plain Cotton T-Shirt - 2 Pack",
                rating: {
                stars: 4.5,
                count: 56
                },
                priceCents: 799,
                keywords: [
                "tshirts",
                "apparel",
                "mens"
                ],
                type: "clothing",
                sizeChartLink: "images/clothing-size-chart.png"
            });
    });

    it('creates the object properly', () => {
        // checking properties
        expect(productExemple.id).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
        expect(productExemple.name).toEqual('Adults Plain Cotton T-Shirt - 2 Pack');
        expect(productExemple.sizeChartLink).toEqual('images/clothing-size-chart.png');
        expect(productExemple.type).toEqual('clothing');
    });

    it ('runs all methods properly', () => {
        expect(productExemple.getStarsUrl()).toEqual('images/ratings/rating-45.png');
        expect(productExemple.getPrice()).toEqual('$7.99');
        expect(productExemple.extraInfoHTML()).toContain('Size Chart');
    })
});

describe('test suite: class Appliance', () => {
    let productExemple;

    beforeEach(() => {  
        productExemple = new Appliance(
            {
                id: "c2a82c5e-aff4-435f-9975-517cfaba2ece",
                image: "images/products/electric-glass-and-steel-hot-water-kettle.webp",
                name: "Electric Glass and Steel Hot Tea Water Kettle - 1.7-Liter",
                type: 'appliance',
                instructionsLink: '../images/appliance-instructions.png',
                warrantyLink: '../images/appliance-warranty.png',
                rating: {
                stars: 5,
                count: 846
                },
                priceCents: 3074,
                keywords: [
                "water boiler",
                "appliances",
                "kitchen"]
            });
    });

    it('creates the object properly', () => {
        // checking properties
        expect(productExemple.id).toEqual('c2a82c5e-aff4-435f-9975-517cfaba2ece');
        expect(productExemple.type).toEqual('appliance');
        expect(productExemple.name).toEqual('Electric Glass and Steel Hot Tea Water Kettle - 1.7-Liter');
        expect(productExemple.instructionsLink).toEqual('../images/appliance-instructions.png');
        expect(productExemple.warrantyLink).toEqual('../images/appliance-warranty.png');
    });

    it('runs all methods properly', () => {
        expect(productExemple.getStarsUrl()).toEqual('images/ratings/rating-50.png');
        expect(productExemple.getPrice()).toEqual('$30.74');
        expect(productExemple.extraInfoHTML()).toContain('Instructions');
    });
});