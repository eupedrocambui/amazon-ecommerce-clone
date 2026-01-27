/*
    Dispatch events when page sections 
    (main, header, checkout header and footer) finish loading
*/ 

export function mainLoaded() {
    document.dispatchEvent(new Event('mainLoaded'));
}

export function headerLoaded() {
    document.dispatchEvent(new Event('headerLoaded')); 
}

export function checkoutHeaderLoaded() {
    document.dispatchEvent(new Event('checkoutHeaderLoaded')); 
}

export function footerLoaded() {
    document.dispatchEvent(new Event('footerLoaded'));
}