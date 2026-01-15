fetch('../shared-pages/footer.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('.amazon-footer').innerHTML = data;
        document.dispatchEvent(new Event('footerLoaded'));
    });