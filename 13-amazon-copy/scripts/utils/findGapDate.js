export function findGap(orderTime, expectedDelivery) {
    //order time (YYYY-MM-DD) -> date1 
    //expected (YYYY-MM-DD) -> date 2
    
    const date1 = dayjs(orderTime);
    const date2 = dayjs(expectedDelivery);
    
    return date2.diff(date1, 'day');
}