import BasePage from "../BasePage/Basepage";

class ProductPage extends BasePage {
    productPageElements = {
        image: '#imgp img',
        title: '#tbodyid > h2',
        price: '#tbodyid > h3',
        description: '#more-information > p',
        addToCartButton: '#tbodyid > div.row a',
    };

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

    baseInfoMatches() {
        return cy.fixture('productDetails.json').then((details) => {
            cy.log(details.title.trim(), ' | ', details.description.trim());
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

    addProductToCart() {
        super.isElementVisible(this.addToCartButton());
        super.isElementClickable(this.addProductToCart());
        return this.addProductToCart().click();
    }
}

module.exports = new ProductPage();