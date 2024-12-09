import BasePage from "../BasePage/Basepage";
class logInPage extends BasePage{
    logInPageElements = {
        logInLabel : '#logInModalLabel',
        closeButton1 : 'logInModal > .close',
        closeButton2 : 'logInModal > .btn-secondary',

    };
    logInLabel(){
        return cy.get(this.logInPageElements.logInLabel, {
            timeout : super.getTimeout(),
        });

    }
    closeButton1 () {
        return cy.get(this.logInPageElements.closeButton1,{
            timeout : super.getTimeout(),

        });


        
    }
    closeButton2 (){
        return cy.get(this.logInPageElements.closeButton2,{
            timeout : super.getTimeout(),
        });
    }
    clickButton1(){
        this.closeButton1().click();
    }
    clickButton2 (){
        this.closeButton2().click();
    }
    isLogInPageVisible(labelText) {
        super.isElementVisible(this.logInLabel());
        this.logInLabel().should('contain.text',labelText);
    }
}
module.exports = new logInPage();