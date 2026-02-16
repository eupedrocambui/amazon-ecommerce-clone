/*
    returns the gap (in days) between two dates
    YYYY-MM-DD format for both
*/ 
export function findGap(orderTime, expectedDelivery) {
    const date1 = dayjs(orderTime);
    const date2 = dayjs(expectedDelivery);
    
    return date2.diff(date1, 'day');
}