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

    cy.get('select#cars').children().each(() => cy.add(0))
});

// @ts-ignore
Cypress.Commands.add("testUnselectionOfOneItem", (index: number | string, method?: string) => {

    if (method === 'keyboard') {
        // todo:
        // in fact, it is not possible yet to unselect or even select an item other than the last one
        // for this there might be some kind of marker necessary -
        // from where you then can press the {Entf} or {Delete} button

        if (index === 'last') {
            // @ts-ignore
            cy.get('body').tab();
            cy.focused().type('{backspace}')
            return
        }
    }

    resolvePosition(index, cy.get('.choosy-list').children('.choosy-item')).then((item) => {

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

    if (type === 'click') {

        cy.get('.choosy-widget').click('topRight')
        const item = resolvePosition(index, cy.get('.choosy-result-list-container').find('.choosy-result-list').children())

        // click on the first result and make sure the widget-list contains the selection on the right position
        item.click()
            .then(($el) => {
                resolvePosition(index, cy.get('.choosy-list').children())
                    .should('have.class', 'choosy-item')
                    .contains($el.text()).should('exist')

                cy.testSelectContent($el.text().toLowerCase())
            });

        // result container closes on selection
        cy.get('.choosy-result-list-container').should('not.be.visible')
    }

    if (type === 'keyboard') {
        // @ts-ignore
        cy.get('body').tab();

        for (let i = 0; i <= index; i++) {
            cy.focused().type('{downArrow}')
        }

        cy.focused().type('{enter}')

        // result container do not close on selection
        cy.get('.choosy-result-list-container').should('be.visible')
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
Cypress.Commands.add('exactlyOneItemGotRemoved', () => {
    cy.get('select#cars').children().each((_$el, _index, list) => {
        if (_index + 1 === list.length) {
            cy.get('.choosy-list').children('.choosy-item').should('have.lengthOf', list.length - 1)
        }
    })
})

Cypress.Commands.add('widgetShouldNotContain', (value: string, index?: number) => {
    if (index) {
        cy.get('.choosy-list').children()['eq'](index)
            .should('have.class', 'choosy-item')
            .should('contain', value)
            .should('not.exist')
    } else {
        cy.get('.choosy-list').children().should('not.contain', value)
    }
})

Cypress.Commands.add('widgetShouldContain', (value: string, index?: number) => {
    if (index) {
        cy.get('.choosy-list').children()['eq'](index)
            .should('have.class', 'choosy-item')
            .should('contain', value)
            .should('exist')
    } else {
        cy.get('.choosy-list').children().should('contain', value)
    }
})

Cypress.Commands.add('add', (index: number, type: string = 'click') => {
    if (type === 'click') {
        cy.get('.choosy-widget').click('topRight')
        resolvePosition(index, cy.get('.choosy-result-list-container').find('.choosy-result-list').children()).click()
    }

    if (type === 'keyboard') {

        // yes - I know this is not keyboard navigation - but cypress tab plugin is apita
        // and this time it also should scope it to a test container.
        // this is too much - so we sick to activating the widget by clicking it
        cy.get('.choosy-widget').click('topRight')
        cy.focused().type('{downArrow}{enter}')
    }

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

            add(index: number, type?: string): Chainable<void>

            testWidgetContent(value: string, length?: number): Chainable<void>;

            testSelectContent(value: string): Chainable<void>;

            resultListShouldNotContain(value: string): Chainable<void>

            resultListShouldContain(value: string): Chainable<void>

            exactlyOneItemGotRemoved(): Chainable<void>

            widgetShouldNotContain(value: string, index?: number): Chainable<void>

            widgetShouldContain(value: string, index?: number): Chainable<void>
        }
    }
}

export function resolvePosition(index: number | string, subject): Chainable {

    if (typeof index === 'string') {
        subject[index]()
    } else {
        subject['eq'](index)
    }

    return subject
}