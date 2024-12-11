import BasePage from '../basePage/BasePage';
import navBar from '../../support/pages/NavBar';

class ProductPage extends BasePage {
    productPageElements = {
        image: '#imgp img',
        title: '#tbodyid > h2',
        price: '#tbodyid > h3',
        description: '#more-information > p',
        addToCartButton: '#tbodyid > div.row a',
    };

    constructor() {
        super(navBar);
    }

    image() {
        return cy.get(this.productPageElements.image, {
            timeout: super.getTimeout(),
        });
    }
    title() {
        return cy.get(this.productPageElements.title, {
            timeout: super.getTimeout(),
        });
    }
    price() {
        return cy.get(this.productPageElements.price, {
            timeout: super.getTimeout(),
        });
    }
    description() {
        return cy.get(this.productPageElements.description, {
            timeout: super.getTimeout(),
        });
    }
    addToCartButton() {
        return cy.get(this.productPageElements.addToCartButton, {
            timeout: super.getTimeout(),
        });
    }

    isImageVisible() {
        return super.isElementVisible(this.image());
    }

    isTitleVisible() {
        return super.isElementVisible(this.title());
    }

    isPriceVisible() {
        return super.isElementVisible(this.price());
    }

    isDescriptionVisible() {
        return super.isElementVisible(this.description());
    }

    isProductInformationVisible() {
        return () => {
            this.isImageVisible();
            this.isTitleVisible();
            this.isPriceVisible();
            this.isDescriptionVisible();
        };
    }

    navigateToCartPage() {
        super.navigateToNavBarOption('Cart');
    }

    baseInfoMatches() {
        return cy.fixture('productDetails.json').then((details) => {
            this.title()
                .invoke('text')
                .then((text) => {
                    expect(text.trim()).to.equal(details.title.trim());
                });

            this.description()
                .invoke('text')
                .then((text) => {
                    expect(text.trim()).to.equal(details.description.trim());
                });
        });
    }

    addAndSaveProductToCart() {
        const productAddedToCartDetails = {};

        const productTitle = this.title();
        super.isElementVisible(productTitle);
        productTitle.invoke('text').then((title) => {
            productAddedToCartDetails.title = title;
        });

        const productPrice = this.price();
        super.isElementVisible(productPrice);
        productPrice.invoke('text').then((price) => {
            const cleanedPrice = price.replace(/[\$\s*includes tax]/g, '');
            cy.log(cleanedPrice);
            productAddedToCartDetails.price = cleanedPrice;
        });

        cy.writeFile(
            'cypress/fixtures/productAddedToCartDetails.json',
            productAddedToCartDetails
        );

        super.isElementVisible(this.addToCartButton());
        super.isElementClickable(this.addToCartButton());
        this.addToCartButton().click();
    }

    addProductToCart() {
        super.isElementVisible(this.addToCartButton());
        super.isElementClickable(this.addToCartButton());
        this.addToCartButton().click();
    }
}

module.exports = new ProductPage();