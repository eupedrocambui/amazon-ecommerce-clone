fetch("../shared-pages/checkout-header.html")
    .then(response => response.text())
    .then(data => {
        document.querySelector(".checkout-header").innerHTML = data;
    });