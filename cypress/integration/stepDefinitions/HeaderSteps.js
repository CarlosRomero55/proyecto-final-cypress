import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

const navBar = require('../../support/pages/NavBar');
const homePage = require('../../support/Pages/HomePage');
const cartPage = require('../../support/pages/CartPage');
const loginPage = require('../../support/pages/LogInPage');

beforeEach({ tags: '@main-page' }, () => {
    cy.visit('https://www.demoblaze.com/cart.html');
});

Given('the header navigation menu is visible', () => {
    navBar.isNavBarVisible();
    cy.log('Every option of the nav bar is visible and clickable');
});

When('I click on {string}', (option) => {
    navBar.clickNavOption(option);
    cy.log(`The navbar option '${option}' was clicked`);
});

Then('I should be able to see the carousel', () => {
    homePage.isCarouselVisible();
    cy.log("The current page is now 'Home' and carousel is visible");
});

When('I click on {string}', (option) => {
    navBar.clickNavOption(option);
    cy.log(`The navbar option '${option}' was clicked`);
});

Then('a {string} modal should appear', (labelText) => {
    loginPage.isLogInPageVisible(labelText);
    cy.log("The current page is now 'Log in' and 'Log in' label is visible");
});

Then('the modal should contain login form fields', () => {
    loginPage.isLoginFormVisible();
    cy.log('Login form fields are visible and clickable');
});

Given('I am on the {string} page', (option) => {
    navBar.clickNavOption(option);
    cy.log("The current page is 'Cart'");
});

Given('I have items in my cart', () => {
    if (cartPage.isCartEmpty()) {
        cartPage.navigateToHomePage();
        homePage.clickRandomProduct();
        ProductPage.addProductToCart();
        ProductPage.navigateToCartPage();
    }
    cy.log('Cart is not empty');
});

When('I navigate to {string} section', (option) => {
    navBar.clickNavOption(option);
    cy.log(`The current page is now ${option}`);
});

Then('I return to the {string} page', (option) => {
    navBar.clickNavOption(option);
    cy.log(`The current page is now ${option}`);
});

Then('my cart should remain with items', () => {
    expect(cartPage.isCartEmpty()).to.not.be.true;
    cy.log('Cart remains with items');
});

When('I hover over {string} link', (option) => {
    navBar.hoverItem(option);
    cy.log(`${option} header link is hovered`);
});

Then('the link should display a visual hover state', () => {
    navBar.itemHasHoverState();
    cy.log('Header link has a hover state');
});

Then("the cursor should change to indicate it's clickable", () => {
    navBar.isCursorClickableAtItem();
    cy.log('Curso changes to a clickable state when hovers header link');
});