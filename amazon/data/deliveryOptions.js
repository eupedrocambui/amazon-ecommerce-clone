// delivery options array, used on checkout page
export let deliveryOptions = [{
    id: '1',
    deliveryDays: '7',
    priceCents: 0
}, {
    id: '2',
    deliveryDays: '3',
    priceCents: 499
}, {
    id: '3',
    deliveryDays: '1',
    priceCents: 999
}]

// checks if a day is weekend or not
function isWeekend(date) {
    let dateName = date.format('dddd');
    if (dateName === 'Saturday' || dateName === 'Sunday') {
        return true;
    } else {
        return false;
    }
}

/*
    returns the delivery date string ("dddd, MMMM D") based on the choosen delivery option
    only counts business days
*/
export function calculateDeliveryDate(deliveryOption) {
    let deliveryDate = dayjs();
    let daysRemaining = deliveryOption.deliveryDays;

    while (daysRemaining != 0) {
        deliveryDate = deliveryDate.add(1, 'days');
        if (isWeekend(deliveryDate) === false) {
            daysRemaining--;
        } 
        
    }

    return deliveryDate.format('dddd, MMMM D');
}