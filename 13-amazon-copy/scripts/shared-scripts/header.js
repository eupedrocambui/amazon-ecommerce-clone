fetch("../shared-pages/header.html")
    .then(response => response.text())
    .then(data => {
        document.querySelector(".amazon-header").innerHTML = data; 
        document.dispatchEvent(new Event('headerLoaded')); 
    });