import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

const homePage = require('../../support/pages/HomePage');
const productPage = require('../../support/Pages/ProductPage');

beforeEach({ tags: '@main-page' }, () => {
    cy.visit('https://www.demoblaze.com/');
});

When('I click on a product', () => {
    homePage.clickRandomProduct();
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