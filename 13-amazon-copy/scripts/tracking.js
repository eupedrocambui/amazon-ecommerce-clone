function renderTrackingHTML() {
    console.log(JSON.parse(localStorage.getItem('productData')));
    //const productData = JSON.parse(localStorage.getItem('productData'));

    //localStorage.removeItem('productData');

    const deliveryDate = productData.deliveryDate;
    const productName = productData.productName;
    const quantity = productData.quantity;
    const imageLink = productData.imageLink;
    const status = productData.status;
    // deliveryDate (Monday, June 13)
    // productName
    // quantity
    // imageLink
    // status 1, 2 or 3

    // url orderId productId

    let trackingSummaryHTML = 
    `
    <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${deliveryDate}
        </div>

        <div class="product-info">
          ${productName}
        </div>

        <div class="product-info">
          Quantity: ${quantity}
        </div>

        <img class="product-image" src="${imageLink}">

        <div class="progress-labels-container">
          <div class="progress-label ${status === 1 ? 'current-status' : ''}">
            Preparing
          </div>
          <div class="progress-label ${status === 2 ? 'current-status' : ''}">
            Preparing">
            Shipped
          </div>
          <div class="progress-label ${status === 3 ? 'current-status' : ''}">
            Preparing">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
    `;

    return trackingSummaryHTML;
}


/*
    <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${deliveryDate}
        </div>

        <div class="product-info">
          ${productName}
        </div>

        <div class="product-info">
          Quantity: ${quantity}
        </div>

        <img class="product-image" src="${imageLink}">

        <div class="progress-labels-container">
          <div class="progress-label ${status === 1 ? 'current-status' : ''}">
            Preparing
          </div>
          <div class="progress-label ${status === 2 ? 'current-status' : ''}">
            Preparing">
            Shipped
          </div>
          <div class="progress-label ${status === 3 ? 'current-status' : ''}">
            Preparing">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
*/

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

// returns today's date in format YYYY-MM-DD
export function getTodayDate() {
  return dayjs().format('YYYY-MM-DD');
}

const finalHTML = renderTrackingHTML();
document.querySelector('.order-tracking').innerHTML = finalHTML;