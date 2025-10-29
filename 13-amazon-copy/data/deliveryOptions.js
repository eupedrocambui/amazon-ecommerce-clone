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

function isWeekend(date) {
    let dateName = date.format('dddd');
    if (dateName === 'Saturday' || dateName === 'Sunday') {
        return true;
    } else {
        return false;
    }
}

// returns the date string ("dddd, MMMM D") based on the choosen delivery option
export function calculateDeliveryDate(deliveryOption) {
    //let deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
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