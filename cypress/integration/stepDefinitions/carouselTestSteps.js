import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

const homePage = require('../../support/pages/HomePage');

beforeEach(() => {
    cy.visit('https://www.demoblaze.com/');
});

Given('the carousel is visible', () => {
    homePage.isCarouselVisible();
    cy.log('Carousel is visible');
});

When('there is an active carousel image', () => {
    homePage.getActiveImage();
    cy.log('There is an active imagen in carousel');
});

When("I click on the carousel's right arrow", () => {
    homePage.goToNextItem();
    cy.log('he carousel has moved forward');
});

Then(
    'the new displayed image should be different from the previous one',
    () => {
        homePage.checkActiveImageChange();
        cy.log('The image has changed succesfully');
    }
);

Then('the previous image should not be visible', () => {
    homePage.isOldActiveImageNotVisible();
    cy.log('The old active image is not visible');
});

When('{string} image is visible', (alt) => {
    homePage.isItemVisibleByALt(alt);
    cy.log('The `${alt}` image is visible');
});

When(
    "I click on the carousel's right arrow navigating through all items",
    () => {
        homePage.repeatCarouselItemsNthTimes(homePage.getItemsQuantity());
        cy.log('All the elements have been traversed');
    }
);

Then('it should display the {string} image again', (alt) => {
    homePage.isItemVisibleByALt(alt);
    cy.log('The `${alt}` image is visible again');
});

Given("I don't interact with the carousel", () => {
    cy.log('Not interacting with carousel');
});

When('I wait for {int} seconds', (seconds) => {
    cy.wait(seconds * 1000);
});

Then('images should change automatically', () => {
    homePage.getActiveImage();
    homePage.goToNextItem();
    homePage.checkActiveImageChange();
});