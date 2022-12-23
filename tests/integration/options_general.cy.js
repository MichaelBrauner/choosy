import classnames from "../../src/classnames";

describe('options_keyboard', () => {

    beforeEach(() => {
        cy.visit('/tests/templates/options')
    })

    it('should disable the widget', function () {
        cy.get('.' + classnames.widget).should('have.class', 'disabled')
        cy.get('.' + classnames.input).should('be.disabled')
    });

})