/// <reference types="cypress" />

import classnames from "../../src/classnames";

describe('options_keyboard', () => {

    beforeEach(() => {
        cy.visit('/tests/templates/options')
    })

    it('should limit the widget', function () {
        cy.get('.test-container_limited_2').within(() => {

            cy.add(0, 'keyboard')
            cy.add(0, 'keyboard')

            cy.isLocked()

            cy.testUnselectionOfOneItem('last')
            cy.focused().type('Au')
            cy.resultListShouldBeOpen()

            cy.add(0, 'keyboard')

            cy.isLocked()
        });

        cy.resultListShouldBeClosed()
    });

})