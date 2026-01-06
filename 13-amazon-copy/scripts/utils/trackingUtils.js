// returns today's date in format YYYY-MM-DD
export function getTodayDate() {
  return dayjs().format('YYYY-MM-DD');
}



// calculates the delivery progress percent (for tracking page)
// ((current time - order time) / (delivery time - order time)) * 100
export function calculateProgressPercent(currentTimeOg, orderTimeOg, deliveryTimeOg) {
  let currentTime = dayjs(currentTimeOg);
  let orderTime = dayjs(orderTimeOg);
  let deliveryTime = dayjs(deliveryTimeOg);

  // difference (in days) between today and order's day
  const todayToOrderDif = currentTime.diff(orderTime, 'days');

  // difference (in days) between delivery date and order's day
  const deliveryToOrderDif = deliveryTime.diff(orderTime, 'days')

  // calculates the percentage and rounds it down
  const percentage = ((todayToOrderDif) / (deliveryToOrderDif)) * 100;
  return Math.floor(percentage);
}