// returns today's date in format YYYY-MM-DD
export function getTodayDate() {
  return dayjs().format('YYYY-MM-DD');
}



// calculates the delivery progress percent (for tracking page)
// ((current time - order time) / (delivery time - order time)) * 100
export function calculateProgressPercent(currentTimeInput, orderTimeInput, deliveryTimeInput) {
  const currentTime = dayjs(currentTimeInput);
  const orderTime = dayjs(orderTimeInput);
  const deliveryTime = dayjs(deliveryTimeInput);
  /*console.log('current time');
  console.log(currentTime);
  console.log('order time');
  console.log(orderTime);
  console.log('delivery time');
  console.log(deliveryTime);*/

  // difference (in days) between today and order's day
  const todayToOrderDif = currentTime.diff(orderTime, 'days');
  //console.log(todayToOrderDif); //0

  // difference (in days) between delivery date and order's day
  const deliveryToOrderDif = deliveryTime.diff(orderTime, 'days')
  //console.log(deliveryToOrderDif); //2

  // calculates the percentage and rounds it down
  const percentage = ((todayToOrderDif) / (deliveryToOrderDif)) * 100;
  //console.log(percentage); //0
  return Math.floor(percentage);
}