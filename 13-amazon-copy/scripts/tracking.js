function renderTrackingHTML() {
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