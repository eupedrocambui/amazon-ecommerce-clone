import { renderTrackingHTML } from "../../scripts/tracking.js";
import { calculateProgressPercent } from "../../scripts/utils/trackingUtils.js";

describe('test suite: calculateProgressPercent', () => {
    // function parameters -> current time, order time, delivery time

    it('calculates the percentage properly', () => {
        expect(calculateProgressPercent('2025-11-03', '2025-10-27', '2025-11-05')).toEqual(77);
    });

    it('returns 0 when order time equals current time', () => {
        expect(calculateProgressPercent('2025-11-03', '2025-11-03', '2025-11-09')).toEqual(0);
    });

    it('returns more than 100 when order has already been delivered', () => {
        expect(calculateProgressPercent('2025-11-10', '2025-11-03', '2025-11-09')).toEqual(116);
    });
});

describe('test suite: progressBar', () => {
    beforeEach(() => {
        // injecting page structure
        document.querySelector('.js-test-container').innerHTML = 
        `
            <div class="order-tracking"></div>
        `;

        spyOn(localStorage, 'getItem').and.callFake(() => {  // replacing getItem with spy (fake productData)
            return JSON.stringify({
                deliveryDate: "Friday, January 9",
                imageLink: "images/products/intermediate-composite-basketball.jpg",
                productName: "Intermediate Size Basketball",
                progressPercent: "50",
                quantity: "1",
                status: "1"
            });
        });
        
        // filling order-tracking div with tracking HTML
        document.querySelector('.order-tracking').innerHTML = renderTrackingHTML();
    });

    afterEach(() => {
        document.querySelector('.order-tracking').innerHTML = '';  // cleaning HTML
    });
    
    it('gets progress percent and displays it', () => {
            const progressBarElem = document.querySelector('.progress-bar');
            const progressPercent = progressBarElem.dataset.progressPercent;
            progressBarElem.style.width = `${progressPercent}%`;

            expect(progressBarElem.dataset.progressPercent).toEqual('50'); // checking progressPercent 
            expect(progressBarElem.style.width).toEqual('50%'); // checking bar width change
    });
});

describe('test suite: renderTrackingHTML', () => {
    beforeEach(() => {
        // injecting page structure
        document.querySelector('.js-test-container').innerHTML = 
        `
            <div class="order-tracking"></div>
        `;

        spyOn(localStorage, 'getItem').and.callFake(() => {  // replacing getItem with spy (fake productData)
            return JSON.stringify({
                deliveryDate: "Friday, January 9",
                imageLink: "images/products/intermediate-composite-basketball.jpg",
                productName: "Intermediate Size Basketball",
                progressPercent: "50",
                quantity: "1",
                status: "1"
            });
        });
        
        // filling order-tracking div with tracking HTML
        document.querySelector('.order-tracking').innerHTML = renderTrackingHTML();
    });
    
    afterEach(() => {
        document.querySelector('.order-tracking').innerHTML = '';  // cleaning HTML
    });
    
    it('renders tracking HTML properly', () => {
        // checking product data
        expect(document.querySelector('.delivery-date').innerHTML).toContain('Arriving on Friday, January 9');
        
        const productInfoElems = document.querySelectorAll('.product-info');
        expect(productInfoElems[0].innerHTML).toContain('Intermediate Size Basketball');
        expect(productInfoElems[1].innerHTML).toContain('Quantity: 1');

        expect(document.querySelector('.product-image').src).toContain(
            'images/products/intermediate-composite-basketball.jpg'
        );
        
        // checking product status
        const progressLabelElems = document.querySelectorAll('.progress-label');
        expect(progressLabelElems[0].classList.contains('current-status')).toBeTrue();
        expect(progressLabelElems[1].classList.contains('current-status')).toBeFalse();
        expect(progressLabelElems[2].classList.contains('current-status')).toBeFalse();
        
        // checking progress bar
        const progressBarElem = document.querySelector('.progress-bar');
        expect(progressBarElem.dataset.progressPercent).toEqual('50');
    });
});
