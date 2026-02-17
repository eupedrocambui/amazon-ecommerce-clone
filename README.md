# Amazon E-commerce Clone

Amazon E-commerce Clone is a frontend project that replicates key pages and functionality of a simplified Amazon website using HTML, CSS, and JavaScript.
This clone focuses on UI structure, responsiveness, and layout of essential e-commerce screens including Order History, Checkout, and Tracking pages.

# Project Purpose
The main goal of this project was to improve my JavaScript skills by applying them in a real-world e-commerce simulation.
This project was developed as part of the JavaScript course by @SuperSimpleDev on YouTube, where I focused on learning JavaScript from the basics to advanced skills.

Another objective of this project was to keep improving my English proficiency by taking contact with technical content and writing code in English.

# Features

Three core pages with realistic UI:
- Home / Index
- Checkout
- Orders
- Tracking

# Technologies Used
- HTML, CSS and JavaScript
- Jasmine Framework for Unit Testing
- Git & GitHub

# Main Concepts Practiced
### - MVC Architecture

This project was developed following the MVC (Model–View–Controller) architectural pattern, even though it is a frontend-only application.

Model → Responsible for handling data

View → HTML structure and dynamic rendering in the browser

Controller → JavaScript logic that connects the data (Model) to the UI (View)

### - Unit Testing with Jasmine

Unit tests were implemented using the Jasmine testing framework.

Tests were written to validate business logic functions, data manipulation and expected outputs from core JavaScript modules

# Additional Concepts Practiced

Object-Oriented Programming (OOP) with JavaScript Classes

Array Methods (map, filter)

Component-Based Structure

Event Handling

Responsive Design

Git Version Control

GitHub Pages Deployment

Code Organization Best Practices

File Structure Organization

# How to Run the Project Locally

1- Clone the Repository
```bash
git clone https://github.com/eupedrocambui/amazon-ecommerce-clone
```

2- Navigate to the Project Folder
```bash
cd amazon-ecommerce-clone
```

3- Open ```index.html``` file in your web browser to run the project

4- Open ```tests/tests.html``` file in your web browser to run Jasmine tests

## File Structure

```
amazon-ecommerce-clone/                 # Main project folder
├── data/                               # Contains application data and business logic
│   ├── cart.js                         # Handles shopping cart data and cart-related logic
│   ├── deliveryOptions.js              # Stores and manages delivery options data
│   ├── orders.js                       # Manages order data and order history
│   └── products.js                     # Contains product data and product-related functions
├── images/                             # Stores all static image assets used in the project
├── scripts/                            # Main JavaScript logic for the application
│   ├── checkout/                       # Scripts specific to the checkout page
│   ├── events/                         # Centralized event handling logic
│   ├── shared-scripts/                 # Header and footer scripts shared across multiple pages
│   ├── utils/                          # Utility/helper functions used throughout the project
│   ├── amazon.js                       # Main logic for the home (store) page
│   ├── checkout.js                     # Main entry script for the checkout page
│   ├── orders.js                       # Controls the orders page behavior
│   └── tracking.js                     # Handles order tracking page logic
├── styles/                             # All CSS styling files for the project
├── tests/                              # Contains Jasmine unit tests files
│   ├── checkout/                       # Tests related to checkout functionality
│   ├── data/                           # Tests for data scripts
│   ├── lib/                            # Jasmine default files
│   ├── scripts/                        # Tests for main script files
│   ├── utils/                          # Tests for utility functions
│   └── tests.html                      # HTML file used to run all tests in the browser
├── checkout.html                       # Checkout page
├── index.html                          # Home/store page
├── orders.html                         # Orders page
└── tracking.html                       # Order tracking page

```

---

Created by [Pedro C. Martins](https://github.com/eupedrocambui)

Feel free to open issues, propose improvements, or use this project for educational purposes
