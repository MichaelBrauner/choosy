/// <reference types="cypress" />

// @ts-ignore
import Chainable = Cypress.Chainable;
import classnames from "../../src/classnames";

// @ts-ignore
Cypress.Commands.add("addAllResultsToWidgetList", (method?: string) => {

    if (method === 'keyboard') {

        // @ts-ignore
        cy.get('body').tab()
        cy.get('select#cars').children().each(() => cy.focused().type('{downArrow}{enter}'))

        return
    }

    cy.get('select#cars').children().each(() => {
        cy.get('.choosy-widget').click('topRight')
        cy.get('.choosy-result-list-container').find('.choosy-result-list').children().first().click()
    })
});

// @ts-ignore
Cypress.Commands.add("testUnselectionOfOneItem", (index: number | string, method?: string) => {

    if (method === 'keyboard') {
        console.log('hey')
        return
    }

    resolvePositon(index, cy.get('.choosy-list').children('.choosy-item')).then((item) => {

        const value = item.text().trim().replace(/(\r?\n|\r)/gm, ' ')
        item.children('.choosy-remove-button').click()

        // the result window is opened and contains the value again.
        cy.get('.choosy-result-list-container').should('be.visible').should('contain', value)

        // the value is not in the widget list anymore
        cy.get('.choosy-list').children('.choosy-item').should('not.contain', value)

        // choosy input is selected - so you can write again
        cy.get('.choosy-input').should('be.focused')
    })

})

// @ts-ignore
Cypress.Commands.add('testAdditionToWidgetList', (index: int | string, type?: string = 'click') => {

    cy.get('.choosy-widget').click('topRight')
    const item = resolvePositon(index, cy.get('.choosy-result-list-container').find('.choosy-result-list').children())

    if (type === 'click') {

        // click on the first result and make sure the widget-list contains the selection on the right position
        item.click()
            .then(($el) => {
                resolvePositon(index, cy.get('.choosy-list').children())
                    .should('have.class', 'choosy-item')
                    .contains($el.text()).should('exist')

                cy.testSelectContent($el.text().toLowerCase())
            });

        // result container closes on selection
        cy.get('.choosy-result-list-container').should('not.be.visible')
    }
})

// @ts-ignore
Cypress.Commands.add('resultListShouldBeOpen', () => {
    cy.get('.' + classnames.result_list_container).should('be.visible')
})

// @ts-ignore
Cypress.Commands.add('resultListShouldBeClosed', () => {
    cy.get('.' + classnames.result_list_container).should('not.be.visible')
})

// @ts-ignore
Cypress.Commands.add('testWidgetContent', (value: string, length: number = 1) => {
    cy.get('.choosy-list').children('.' + classnames.item)
        .should('have.length', length)
        .should('contain', value)
})

Cypress.Commands.add('testSelectContent', (value: string) => {
    cy.get('#cars').invoke('val').should('include', value)
})

// @ts-ignore
Cypress.Commands.add('resultListShouldNotContain', (value: string) => {
    cy.get('.choosy-result-list-container')
        .find('.choosy-result-list').should('exist')
        .contains(value).should('not.exist')
})

// @ts-ignore
Cypress.Commands.add('resultListShouldContain', (value: string) => {
    cy.get('.choosy-result-list-container')
        .find('.choosy-result-list').should('exist')
        .contains(value).should('exist')
})


// @ts-ignore
declare global {
    namespace Cypress {
        interface Chainable {
            // @ts-ignore
            addAllResultsToWidgetList(method?: string): Chainable<void>;

            // @ts-ignore
            resultListShouldBeOpen(): Chainable<void>;

            // @ts-ignore
            resultListShouldBeClosed(): Chainable<void>;

            // @ts-ignore
            testUnselectionOfOneItem(index: number | string, method?: string): Chainable<void>;

            // @ts-ignore
            testAdditionToWidgetList(index: number | string, type?: string = 'click'): Chainable<void>;

            testWidgetContent(value: string, length?: number): Chainable<void>;

            testSelectContent(value: string): Chainable<void>;

            resultListShouldNotContain(value: string): Chainable<void>

            resultListShouldContain(value: string): Chainable<void>


        }
    }
}

function resolvePositon(index: number | string, subject): Chainable {

    if (typeof index === 'string') {
        subject[index]()
    } else {
        subject['eq'](index)
    }

    return subject
}