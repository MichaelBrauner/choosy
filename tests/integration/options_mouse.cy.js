/// <reference types="cypress" />

import classnames from "../../src/classnames";

describe('options_mouse', () => {

    beforeEach(() => {
        cy.visit('/tests/templates/options')
    })

    it.only('should limit the widget', function () {

        cy.get('.test-container_limited_2').within(() => {

            cy.add(0)
            cy.add(0)

            cy.get('.choosy-widget').click('topRight')
            cy.resultListShouldBeClosed()

            cy.get('.' + classnames.input)
                .should('be.focused')
                .type('Volvo')
                .should('have.value', '')
            cy.resultListShouldBeClosed()

            cy.testUnselectionOfOneItem(1)
            cy.focused().type('Au')
            cy.resultListShouldBeOpen()

            cy.add(0)

            cy.get('.' + classnames.input)
                .should('be.focused')
                .type('Volvo')
                .should('have.value', '')
        });

        cy.resultListShouldBeClosed()
    })

    it('should not open on focus if disabled', function () {

    });

})