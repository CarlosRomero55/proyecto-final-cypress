import BasePage from "../BasePage/Basepage";

class HomePage extends BasePage {
    homePageCarouselElements = {
        carousel: '#carouselExampleIndicators',
        carouselItem: '.carousel-item',
        prevItemButton: '.carousel-control-prev-icon',
        nextItemButton: '.carousel-control-next-icon',
    };

    homePageProductGridElements = {
        productGrid: '#tbodyid',
    };

    /* ATTRIBUTES */
    carousel() {
        return cy.get(this.homePageCarouselElements.carousel, {
            timeout: super.getTimeout(),
        });
    }
    carouselItem() {
        return cy.get(this.homePageCarouselElements.carouselItem, {
            timeout: super.getTimeout(),
        });
    }
    prevItemButton() {
        return cy.get(this.homePageCarouselElements.prevItemButton, {
            timeout: super.getTimeout(),
        });
    }
    nextItemButton() {
        return cy.get(this.homePageCarouselElements.nextItemButton, {
            timeout: super.getTimeout(),
        });
    }
    activeCarouselImage() {
        return super.isElementVisible(
            this.carousel().find('.active', { timeout: super.getTimeout })
        );
    }
    productGrid() {
        return cy.get(this.homePageProductGridElements.productGrid, {
            timeout: super.getTimeout,
        });
    }

    /* FUNCTIONS */
    // Functions for Carousel
    goToPrevItem() {
        super.isElementVisible(this.prevItemButton());
        super.isElementClickable(this.prevItemButton());
        return this.prevItemButton().click();
    }

    goToNextItem() {
        super.isElementVisible(this.nextItemButton());
        super.isElementClickable(this.nextItemButton());
        return this.nextItemButton().click();
    }

    isCarouselVisible() {
        return super.isElementVisible(this.carousel());
    }

    isItemVisibleByALt(alt) {
        return this.isElementVisible(this.carousel().find(`img[alt="${alt}"]`));
    }

    getActiveImage() {
        return this.carousel()
            .find('.active img')
            .invoke('attr', 'alt')
            .as('oldAlt');
    }

    checkActiveImageChange() {
        cy.wait(2000);
        return this.carousel()
            .find('.active img')
            .invoke('attr', 'alt')
            .then((newAlt) => {
                cy.get('@oldAlt').then((oldAlt) => {
                    expect(oldAlt).to.not.equal(newAlt);
                });
            });
    }

    isOldActiveImageNotVisible() {
        return cy.get('@oldAlt').then((oldAlt) => {
            return super.verifyElementHasClass(
                super.isElementNotVisible(cy.get(`img[alt="${oldAlt}"]`)),
                'active'
            );
        });
    }

    getItemsQuantity() {
        return this.carouselItem().its('length');
    }

    repeatCarouselItemsNthTimes(times) {
        for (let i = 0; i < 3; i++) {
            super.isElementVisible(this.carouselItem().eq(i));
            this.goToNextItem();
            cy.wait(1000);
        }
    }

    //Functions for products
    clickRandomProduct() {
        this.productGrid()
            .find('> div')
            .its('length')
            .then((length) => {
                const randomIndex = Math.floor(Math.random() * length);

                const productDetail = {};

                super.isElementVisible(this.productGrid());
                this.productGrid()
                    .find('> div')
                    .eq(randomIndex)
                    .then((element) => {
                        super.isElementVisible(cy.wrap(element));
                        super.isElementClickable(cy.wrap(element));

                        cy.wrap(element)
                            .find('.card-title')
                            .invoke('text')
                            .then((title) => {
                                productDetail.title = title;
                            });

                        cy.wrap(element)
                            .find('#article')
                            .invoke('text')
                            .then((description) => {
                                productDetail.description = description;
                            });

                        cy.wrap(element).find('.card-img-top').click();
                    });

                cy.writeFile(
                    'cypress/fixtures/productDetails.json',
                    productDetail
                );
            });
    }
}

module.exports = new HomePage();