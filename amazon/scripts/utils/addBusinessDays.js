/*
    orderTime format -> "YYYY-MM-DD"
    dateGap -> 7, 3 or 1
*/
export function addBusinessDays(orderTime, dateGap) {
    const date = new Date(orderTime);
    let addedDays = 0;

    while (addedDays < dateGap) {
        date.setDate(date.getDate() + 1);

        // Checking if new date is a weekday (Mon–Fri)
        const day = date.getDay();
        if (day !== 0 && day !== 6) { // 0 = Sunday, 6 = Saturday
            addedDays++;
        }
    }

    // Return in YYYY-MM-DD format
    return date.toISOString().split('T')[0];
}