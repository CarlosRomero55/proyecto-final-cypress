import BasePage from "../BasePage/Basepage";


class ContactsPage extends BasePage {
    contactsPageElements = {
        contactsLabel: '#exampleModalLabel',
        closeButton1: '#exampleModal > .close',
        closeButton2: '#exampleModal > .btn-secondary',
    };

    contactsLabel() {
        return cy.get(this.contactsPageElements.contactsLabel, {
            timeout: super.getTimeout(),
        });
    }

    closeButton1() {
        return cy.get(this.contactsPageElements.closeButton1, {
            timeout: super.getTimeout(),
        });
    }

    closeButton2() {
        return cy.get(this.contactsPageElements.closeButton2, {
            timeout: super.getTimeout(),
        });
    }

    clickCloseButton1() {
        this.closeButton1().click();
    }

    clickCloseButton2() {
        this.closeButton2().click();
    }

    isContactsPageVisible(labelText) {
        super.isElementVisible(this.contactsLabel());
        this.contactsLabel().should('contain.text', labelText);
    }
}

module.exports = new ContactsPage();