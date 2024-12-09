import BasePage from "../BasePage/Basepage";

class HomePage extends BasePage {
    homePageElements = {
        carousel: '#carouselExampleIndicators',
        carouselItem: '.carousel-item',
        prevItemButton: '.carousel-control-prev-icon',
        nextItemButton: '.carousel-control-next-icon',
    };

    // Attributtes

    carousel() {
        return cy.get(this.homePageElements.carousel, {
            timeout: super.getTimeout(),
        });
    }
    carouselItem() {
        return cy.get(this.homePageElements.carouselItem, {
            timeout: super.getTimeout(),
        });
    }
    prevItemButton() {
        return cy.get(this.homePageElements.prevItemButton, {
            timeout: super.getTimeout(),
        });
    }
    nextItemButton() {
        return cy.get(this.homePageElements.nextItemButton, {
            timeout: super.getTimeout(),
        });
    }
    activeCarouselImage() {
        return super.isElementVisible(
            this.carousel().find('.active', { timeout: super.getTimeout })
        );
    }

    // Methods
    goToPrevItem() {
        this.prevItemButton().should('be.visible').and('not.be.disabled');
        return this.prevItemButton().click();
    }

    goToNextItem() {
        this.nextItemButton().should('be.visible').and('not.be.disabled');
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
        const oldAlt = this.oldActiveImage;
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
}

module.exports = new HomePage();