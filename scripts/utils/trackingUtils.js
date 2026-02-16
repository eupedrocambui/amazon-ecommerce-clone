// returns today's date in YYYY-MM-DD format
export function getTodayDate() {
  return dayjs().format('YYYY-MM-DD');
}

/*
  calculates the delivery progress percent (for tracking page)
  ((current time - order time) / (delivery time - order time)) * 100
*/
export function calculateProgressPercent(currentTimeInput, orderTimeInput, deliveryTimeInput) {
  const currentTime = dayjs(currentTimeInput);
  const orderTime = dayjs(orderTimeInput);
  const deliveryTime = dayjs(deliveryTimeInput);

  // days between today and order's day
  const todayToOrderDif = currentTime.diff(orderTime, 'days');

  // days between delivery date and order's day
  const deliveryToOrderDif = deliveryTime.diff(orderTime, 'days')

  // calculates the percentage and rounds it down
  const percentage = ((todayToOrderDif) / (deliveryToOrderDif)) * 100;

  return Math.floor(percentage);
}