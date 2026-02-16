import { footerLoaded } from "../events/events.js";

const footerHTML = 
`
    <div class="footer-content">
        <div class="important-info">
            <div class="info">
                <h1>Get to Know Us</h1>
                <div class="links">
                    <p>About Amazon</p>
                    <p>Amazon Newsletter</p>
                    <p>Careers</p>
                </div>
            </div>
            <div class="info">
                <h1>Make Money with Us</h1>
                <div class="links">
                    <p>Sell on Amazon</p>
                    <p>Become an Affiliate</p>
                    <p>Protect & Build Your Brand</p>
                </div>
            </div>
            <div class="info">
                <h1>Amazon Payment Products</h1>
                <div class="links">
                    <p>Amazon Visa</p>
                    <p>Amazon Store Card</p>
                    <p>Amazon Secured Card</p>
                </div>
            </div>
            <div class="info">
                <h1>Let Us Help You</h1>
                <div class="links">
                    <p>Your Account</p>
                    <p>Your Orders</p>
                    <p>Returns & Replacements</p>
                </div>
            </div>
        </div>

        <hr class="footer-line">

        <div class="logo-language">
            <a href="./index.html">
                <img class="amazon-logo-footer" src="./images/amazon-logo-white.png" alt="Amazon Logo">
            </a>
            <div class="language">
                <img class="flag" src="https://flagicons.lipis.dev/flags/4x3/us.svg" alt="US Flag">
                <p>United States</p>
            </div>
        </div>

        <div class="legal-info">
            <p>Terms of Service | Privacy Policy | Cookies Policy | Interest-based Ads</p>
            <p>© 2026 Amazon. All rights reserved.</p>
        </div>
    </div>
`;

document.addEventListener('mainLoaded', () => {
    document.querySelector('.amazon-footer').innerHTML = footerHTML;
    footerLoaded();
});