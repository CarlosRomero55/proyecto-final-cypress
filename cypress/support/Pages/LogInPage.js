import BasePage from "../BasePage/Basepage";
import navBar from '../../support/pages/NavBar';

class LogInPage extends BasePage {
    logInPageElements = {
        logInLabel: '#logInModalLabel',
        closeButton1: '#logInModal > .close',
        closeButton2: '#logInModal > .btn-secondary',
    };

    logInPageFormElements = {
        usernameInput: '#loginusername',
        passwordInput: '#loginpassword',
    };

    constructor() {
        super(navBar);
    }

    logInLabel() {
        return cy.get(this.logInPageElements.logInLabel, {
            timeout: super.getTimeout(),
        });
    }
    closeButton1() {
        return cy.get(this.logInPageElements.closeButton1, {
            timeout: super.getTimeout(),
        });
    }
    closeButton2() {
        return cy.get(this.logInPageElements.closeButton2, {
            timeout: super.getTimeout(),
        });
    }

    usernameInput() {
        return cy.get(this.logInPageFormElements.usernameInput, {
            timeout: super.getTimeout(),
        });
    }
    passwordInput() {
        return cy.get(this.logInPageFormElements.passwordInput, {
            timeout: super.getTimeout(),
        });
    }

    clickCloseButton1() {
        this.closeButton1().click();
    }

    clickCloseButton2() {
        this.closeButton2().click();
    }

    isLogInPageVisible(labelText) {
        super.isElementVisible(this.logInLabel());
        this.logInLabel()
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.equal(labelText.trim());
            });
    }

    isLoginFormVisible() {
        return () => {
            super.isElementVisible(this.usernameInput());
            super.isElementClickable(this.usernameInput());

            super.isElementVisible(this.passwordInput());
            super.isElementClickable(this.passwordInput());
        };
    }
}

module.exports = new LogInPage();