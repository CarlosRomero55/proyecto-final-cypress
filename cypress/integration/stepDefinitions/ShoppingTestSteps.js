import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

const homePage = require('../../support/Pages/HomePage');
const productPage = require('../../support/Pages/ProductPage');
const cartPage = require('../../support/pages/CartPage');

beforeEach({ tags: '@main-page' }, () => {
    cy.visit('https://www.demoblaze.com/');
});

When('I click on a product', () => {
    homePage.clickAndSaveRandomProduct();
    cy.log('Product has been chosen');
});

Then("all the product's information should be visible", () => {
    productPage.isProductInformationVisible();
    cy.log("Product's information is visible");
});

Then(
    'the presented title and descriptions should match with the ones of the product clicked',
    () => {
        productPage.baseInfoMatches();
        cy.log(
            'The information in Product Page matches with the one of the product clicked in Home Page'
        );
    }
);

Given('I choose a product from the grid', () => {
    homePage.clickRandomProduct();
    cy.log('Product has been chosen');
});

When('I add product to the cart', () => {
    productPage.addAndSaveProductToCart();
    cy.log('Product has been successfully added to cart');
});

Then('the product should be added to my cart', () => {
    productPage.navigateToCartPage();
    cartPage.checkLastProductAdded(true);
    cy.log('Product recently added appears in cart');
});

Given('I have items in my cart', () => {
    cartPage.navigateToHomePage();
    homePage.clickRandomProduct();
    productPage.addProductToCart();
    productPage.navigateToCartPage();
    cy.log('Cart is not empty');
});

When('I remove the last product added to the cart', () => {
    cartPage.removeProductRecentlyAdded();
    cy.log('Product was removed');
});

Then('the product should no longer appear in cart', () => {
    cartPage.checkLastProductAdded(false);
    cy.log('Product recently added, no longer appear in cart');
});

Then('cart total should be recalculated', () => {
    cartPage.checkTotalPriceUpdated();
    cy.log("Cart's total price has changed");
});

Given('cart has at least {int} product', (minimumQuantity) => {
    if (cartPage.isCartEmpty()) {
        for (let i = 0; i < minimumQuantity; i++) {
            cartPage.navigateToHomePage();
            homePage.clickRandomProduct();
            productPage.addProductToCart();
        }
        productPage.navigateToCartPage();
    }
    cy.log('Cart is not empty');
});

When('I proceed to checkout', () => {
    cartPage.placeOrder();
    cy.log('Order has been placed');
});

When('I fill in required payment details', () => {
    cartPage.setUserData();
    cy.log('Data details has setted up');
});

Then(
    'I should see {string} as a successful purchase message',
    (purchaseSuccessText) => {
        cartPage.isPurchaseSuccessful(purchaseSuccessText);
        cy.log('The purchase order has been placed successfully');
    }
);
