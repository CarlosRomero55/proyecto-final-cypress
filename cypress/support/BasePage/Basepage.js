class BasePage {
    wait = {
        timeout: 10000,
    };

    getTimeout() {
        return this.wait.timeout;
    }

    isElementVisible(item) {
        if (typeof item === 'string' && item.startsWith('@')) {
            return cy.get(item).should('be.visible');
        }
        return item.should('be.visible');
    }

    isElementNotVisible(item) {
        if (typeof item === 'string' && item.startsWith('@')) {
            return cy.get(item).should('not.be.visible');
        }
        return item.should('not.be.visible');
    }

    isElementClickable(item) {
        if (typeof item === 'string' && item.startsWith('@')) {
            return cy.get(item).should('exist').and('be.clickable');
        }
        return item.should('exist').and('be.clickable');
    }

    verifyElementHasClass(item, className) {
        if (typeof item === 'string' && item.startsWith('@')) {
            return cy.get(item).should('have.class', className);
        }
        return item.should('not.have.class', className);
    }
}

export default BasePage;