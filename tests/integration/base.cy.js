describe('basic', () => {

    beforeEach(() => {
        cy.visit('/tests/templates/default')
    })

    it('should open and close result list on click onto the widget-div', () => {
        cy.get('.choosy-widget').click()
        cy.get('.choosy-result-list-container').should('be.visible')

        cy.get('body').click(0,0);
        cy.get('.choosy-result-list-container').should('not.be.visible')
    })
})