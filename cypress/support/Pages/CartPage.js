import BasePage from '../BasePage/Basepage';
import navBar from '../../support/Pages/NavBar';

class CartPage extends BasePage {
    cartPageElements = {
        product: '#tbodyid > .success',
        totalPrice: '#totalp',
        placeOrderButton: '#page-wrapper .btn-success',
    };

    cartPagePopUpElements = {
        nameInput: '#name',
        countryInput: '#country',
        cityInput: '#city',
        cardInput: '#card',
        monthInput: '#month',
        yearInput: '#year',
        purchaseButton: '#orderModal .modal-footer > .btn-primary',
        successfulPurchaseLabel:
            'body > div.sweet-alert.showSweetAlert.visible > h2',
    };

    constructor() {
        super(navBar);
    }

    /* ATTRIBUTES */
    // Attributes for Cart Page
    productList() {
        return cy.get(this.cartPageElements.product, {
            timeout: super.getTimeout(),
        });
    }
    totalPrice() {
        return cy.get(this.cartPageElements.totalPrice, {
            timeout: super.getTimeout(),
        });
    }
    placeOrderButton() {
        return cy.get(this.cartPageElements.placeOrderButton, {
            timeout: super.getTimeout(),
        });
    }
    // Attributes for Cart Page
    nameInput() {
        return cy.get(this.cartPagePopUpElements.nameInput, {
            timeout: super.getTimeout(),
        });
    }
    countryInput() {
        return cy.get(this.cartPagePopUpElements.countryInput, {
            timeout: super.getTimeout(),
        });
    }
    cityInput() {
        return cy.get(this.cartPagePopUpElements.cityInput, {
            timeout: super.getTimeout(),
        });
    }
    cardInput() {
        return cy.get(this.cartPagePopUpElements.cardInput, {
            timeout: super.getTimeout(),
        });
    }
    monthInput() {
        return cy.get(this.cartPagePopUpElements.monthInput, {
            timeout: super.getTimeout(),
        });
    }
    yearInput() {
        return cy.get(this.cartPagePopUpElements.yearInput, {
            timeout: super.getTimeout(),
        });
    }
    purchaseButton() {
        return cy.get(this.cartPagePopUpElements.purchaseButton, {
            timeout: super.getTimeout(),
        });
    }
    successfulPurchaseLabel() {
        return cy.get(this.cartPagePopUpElements.successfulPurchaseLabel, {
            timeout: super.getTimeout(),
        });
    }

    /* FUNCTIONS */
    // Functions for Cart Page
    isCartEmpty() {
        return cy.get('body').then(($body) => {
            if ($body.find(this.cartPageElements.product).length === 0) {
                return true;
            }
            return false;
        });
    }

    navigateToHomePage() {
        super.navigateToNavBarOption('Home');
    }

    placeOrder() {
        super.isElementVisible(this.placeOrderButton());
        super.isElementClickable(this.placeOrderButton());
        return this.placeOrderButton().click();
    }

    checkLastProductAdded(isEqual) {
        return cy.fixture('productAddedToCartDetails.json').then((details) => {
            this.productList()
                .eq(0)
                .then((product) => {
                    super.isElementVisible(cy.wrap(product));

                    cy.wrap(product)
                        .find('td:nth-child(2)')
                        .invoke('text')
                        .then((title) => {
                            if (isEqual) {
                                expect(title.trim()).to.equal(
                                    details.title.trim()
                                );
                            } else {
                                expect(title.trim()).to.not.equal(
                                    details.title.trim()
                                );
                            }
                        });

                    cy.wrap(product)
                        .find('td:nth-child(3)')
                        .invoke('text')
                        .then((price) => {
                            if (isEqual) {
                                expect(price.trim()).to.equal(
                                    details.price.trim()
                                );
                            } else {
                                expect(price.trim()).to.not.equal(
                                    details.price.trim()
                                );
                            }
                        });
                });
        });
    }

    removeProductRecentlyAdded() {
        const totalPrice = this.totalPrice();
        super.isElementVisible(totalPrice);
        totalPrice.invoke('text').then((text) => {
            const trimmedText = text.trim();
            if (text !== '') {
                cy.wrap(trimmedText).as('totalPriceText');
            } else {
                cy.wrap('0').as('totalPriceText');
            }
        });

        const lastProduct = this.productList()
            .eq(0)
            .find('td:nth-child(4) > a');
        super.isElementVisible(lastProduct);
        super.isElementClickable(lastProduct);
        return lastProduct.click();
    }

    checkTotalPriceUpdated() {
        return cy.get('@totalPriceText').then((totalPriceText) => {
            const currentTotalPrice = this.totalPrice();
            super.isElementVisible(currentTotalPrice);
            currentTotalPrice.invoke('text').then((currentTotalPriceText) => {
                expect(totalPriceText).to.not.equal(currentTotalPriceText);
            });
        });
    }

    // Functions for Cart Pop Up
    setName(name) {
        const nameInput = this.nameInput();
        super.isElementClickable(nameInput);

        return nameInput.type(name);
    }

    setCountry(country) {
        const countryInput = this.countryInput();
        super.isElementClickable(countryInput);

        return countryInput.type(country);
    }
    setCity(city) {
        const cityInput = this.cityInput();
        super.isElementClickable(cityInput);

        return cityInput.type(city);
    }
    setCard(card) {
        const cardInput = this.cardInput();
        super.isElementClickable(cardInput);

        return cardInput.type(card);
    }
    setMonth(month) {
        const monthInput = this.monthInput();
        super.isElementClickable(monthInput);

        return monthInput.type(month);
    }
    setYear(year) {
        const yearInput = this.yearInput();
        super.isElementClickable(yearInput);

        return yearInput.type(year);
    }

    setUserData() {
        return cy.fixture('userData.json').then((userData) => {
            this.setName(userData.name);
            this.setCountry(userData.country);
            this.setCity(userData.city);
            this.setCard(userData.card);
            this.setMonth(userData.month);
            this.setYear(userData.year);

            this.isElementVisible(this.purchaseButton()),
                this.isElementClickable(this.purchaseButton());
            this.purchaseButton().click();
        });
    }

    isPurchaseSuccessful(labelText) {
        return this.successfulPurchaseLabel().should('has.text', labelText);
    }
}

module.exports = new CartPage();