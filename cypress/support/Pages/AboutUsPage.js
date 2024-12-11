import BasePage from '../basePage/BasePage';
import navBar from '../../support/pages/NavBar';

class AboutUsPage extends BasePage {
    aboutUsElements = {
        aboutUsLabel: '#videoModalLabel',
        closeButton1: '#videoModal > .close',
        closeButton2: '#videoModal > .btn-secondary',
    };

    constructor() {
        super(navBar);
    }

    aboutUsLabel() {
        return cy.get(this.aboutUsElements.aboutUsLabel, {
            timeout: super.getTimeout(),
        });
    }

    closeButton1() {
        return cy.get(this.aboutUsElements.closeButton1, {
            timeout: super.getTimeout(),
        });
    }

    closeButton2() {
        return cy.get(this.aboutUsElements.closeButton2, {
            timeout: super.getTimeout(),
        });
    }

    clickCloseButton1() {
        this.closeButton1().click();
    }

    clickCloseButton2() {
        this.closeButton2().click();
    }

    isAboutUsPageVisible(labelText) {
        super.isElementVisible(this.aboutUsLabel());
        this.aboutUsLabel().should('contain.text', labelText);
    }
}

module.exports = new AboutUsPage();