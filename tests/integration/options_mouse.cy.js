/// <reference types="cypress" />

describe('options_mouse', () => {

    beforeEach(() => {
        cy.visit('/tests/templates/options')
    })

    it.only('should limit the widget', function () {

        cy.get('.test-container_limited_2').within(() => {

            cy.add(0)
            cy.add(0)

            cy.isLocked()

            cy.testUnselectionOfOneItem(1)
            cy.focused().type('Au')
            cy.resultListShouldBeOpen()

            cy.add(0)

            cy.isLocked()
        });

        cy.resultListShouldBeClosed()
    })

})