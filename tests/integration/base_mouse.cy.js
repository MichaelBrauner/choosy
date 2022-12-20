import "./../../src/classnames"
import classnames from "../../src/classnames";

/// <reference types="cypress" />

describe('basic', () => {

    beforeEach(() => {
        cy.visit('/tests/templates/default')
    })

    it('should open and close result list on click onto the widget-div', () => {
        cy.get('.choosy-widget').click()
        cy.resultListShouldBeOpen()

        cy.get('body').click(0, 0);
        cy.resultListShouldBeClosed()
    })

    it('should be possible to select all items from select list to choosy-widget', function () {

        cy.get('select#cars').children().each(($el, index, list) => {
            cy.get('.choosy-widget').click('topRight')

            // click on the first result and make sure the widget-list contains the selection on the correct position
            cy.get('.choosy-result-list-container').find('.choosy-result-list').children().first().click()
                .then(($el) => {
                    cy.get('.choosy-list').children().eq(index)
                        .should('have.class', 'choosy-item')
                        .contains($el.text()).should('exist')
                });

            cy.resultListShouldBeClosed()

            // on last iteration make sure list is complete
            if (index + 1 === list.length) {
                cy.get('.choosy-list').children('.choosy-item').should('have.lengthOf', list.length)
            }

        })

    });

    it('should be possible to unselect first item', function () {
        cy.addAllResultsToWidgetList()
        cy.testUnselectionOfOneItem('first')

        // make sure only one item is removed from widget list
        cy.get('select#cars').children().each((_$el, _index, list) => {
            cy.get('.choosy-list').children('.choosy-item').should('have.lengthOf', list.length - 1)
        })

    });

    it('should be possible to unselect last item', function () {
        cy.addAllResultsToWidgetList()
        cy.testUnselectionOfOneItem('last')
        cy.exactlyOneItemGotRemoved()
    });

    it('should be possible to unselect second item (item in the middle)', function () {
        cy.addAllResultsToWidgetList()
        cy.testUnselectionOfOneItem(2)
        cy.exactlyOneItemGotRemoved()
    });

    it('should be possible to reselect an unselected item', function () {
        cy.testAdditionToWidgetList(0)
        cy.testAdditionToWidgetList(1)
        cy.testUnselectionOfOneItem(1)
        cy.testAdditionToWidgetList(1)
    });

    it('should be possible to write and select from result list', function () {

        // type 'Vol' - case-sensitive
        cy.get('input').type('Vol')

        // wait 200ms for debouncing
        cy.wait(200)

        // 'Add new' should exist inside the result list
        cy.get('.choosy-result-list-container').find('.choosy-result-list')
            .should('exist')
            .children('.' + classnames.result_list_item)
            .should('have.lengthOf', 2)
            .contains('Add new').should('exist')

        // 'Vol' should exist inside the result list
        cy.get('.choosy-result-list-container').find('.choosy-result-list')
            .should('exist')
            .children('.' + classnames.result_list_item)
            .should('have.lengthOf', 2)
            .contains('Volvo').should('exist')
            .click()

        cy.resultListShouldBeClosed()
        cy.testWidgetContent('Volvo')
        cy.testSelectContent('volvo')
    })

    it('should be possible to add and remove an additional item', function () {

        // type 'Opel' into the widget input
        cy.get('input').type('Opel')

        // 'Add new' should exist inside the result list no other item should be found
        cy.get('.choosy-result-list-container').find('.choosy-result-list').should('exist')
            .children('.' + classnames.result_list_item).should('have.lengthOf', 1)
            .contains('Add new').should('exist')
            .click()

        cy.resultListShouldBeClosed()
        cy.testWidgetContent('Opel')
        cy.testSelectContent('__new_option__Opel')

        // remove the new item
        cy.get('.choosy-list').children('.choosy-item').first().children('.choosy-remove-button').click()
        cy.resultListShouldNotContain('Opel')

    });

    it('should limit the amount of shown items by default', function () {
        cy.get('.choosy-widget').click()
        cy.get('.choosy-result-list-container').find('.choosy-result-list').should('exist')

            // we go with 6 items (default is 5 - because the next item is visible by the drop shadow)
            .children('.' + classnames.result_list_item + ':visible').should('have.lengthOf', 6)
            .contains('Saab').should('exist')
            .contains('Audi').should('not.exist')
    })

})