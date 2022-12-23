/// <reference types="cypress" />

import classnames from "../../src/classnames";

describe('options_keyboard', () => {

    beforeEach(() => {
        cy.visit('/tests/templates/options')
    })

    it.only('should disable the widget', function () {
        cy.get('.' + classnames.widget).should('have.class', 'disabled')
        cy.get('.' + classnames.input).should('be.disabled')
    });

    it('should limit the widget', function () {

    });

    it('should not open on focus if disabled', function () {

    });
})