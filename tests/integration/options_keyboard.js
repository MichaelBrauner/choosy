/// <reference types="cypress" />

import classnames from "../../src/classnames";

describe('options_keyboard', () => {

    beforeEach(() => {
        cy.visit('/tests/templates/options')
    })

    it.only('should disable the widget', function () {
        cy.get('.test-container_disabled').tab()
        cy.get(classnames.widget).should('have.class', 'disabled')
    });

    it('should limit the widget', function () {

    });

    it('should not open on focus if disabled', function () {

    });
})