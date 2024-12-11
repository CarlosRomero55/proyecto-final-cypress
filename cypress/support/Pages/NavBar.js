import BasePage from '../basePage/BasePage';

class NavBar extends BasePage {
    navBarOption = {
        home: "#navbarExample > .navbar-nav li:contains('Home')",
        contact: "#navbarExample > .navbar-nav li:contains('Contact')",
        aboutus: "#navbarExample > .navbar-nav li:contains('About Us')",
        cart: "#navbarExample > .navbar-nav li:contains('Cart')",
        login: '#login2',
        signup: '#signin2',
    };

    home() {
        cy.get(this.navBarOption.home, {
            timeout: super.getTimeout(),
        });
    }
    contact() {
        cy.get(this.navBarOption.contact, {
            timeout: super.getTimeout(),
        });
    }
    aboutUs() {
        cy.get(this.navBarOption.aboutus, {
            timeout: super.getTimeout(),
        });
    }
    cart() {
        cy.get(this.navBarOption.cart, {
            timeout: super.getTimeout(),
        });
    }
    logIn() {
        cy.get(this.navBarOption.login, {
            timeout: super.getTimeout(),
        });
    }
    signUp() {
        cy.get(this.navBarOption.signup, {
            timeout: super.getTimeout(),
        });
    }

    clickNavOption(optionName) {
        const option = cy.get(this.navBarOption[optionName.toLowerCase()]);
        super.isElementVisible(option);
        super.isElementClickable(option);
        return option.click();
    }

    isNavBarVisible() {
        return () => {
            super.isElementVisible(this.home());
            super.isElementClickable(this.home());

            super.isElementVisible(this.contact());
            super.isElementClickable(this.contact());

            super.isElementVisible(this.aboutUs());
            super.isElementClickable(this.aboutUs());

            super.isElementVisible(this.cart());
            super.isElementClickable(this.cart());

            super.isElementVisible(this.logIn());
            super.isElementClickable(this.logIn());

            super.isElementVisible(this.signUp());
            super.isElementClickable(this.signUp());
        };
    }

    hoverItem(optionName) {
        const option = cy
            .get(this.navBarOption[optionName.toLowerCase()])
            .as('headerLink');
        return option.trigger('mouseover');
    }

    itemHasHoverState() {
        return cy.get('@headerLink').then((headerLink) => {
            cy.wrap(headerLink)
                .should('have.css', 'color')
                .and('not.equal', 'rgb(0, 0, 0)');
        });
    }

    isCursorClickableAtItem() {
        return cy.get('@headerLink').then((headerLink) => {
            cy.wrap(headerLink)
                .invoke('css', 'cursor')
                .then((cursor) => {
                    expect(cursor).to.be.oneOf(['pointer', 'auto']);
                });
        });
    }
}

module.exports = new NavBar();