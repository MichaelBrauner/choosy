import "./../../src/classnames"
import classnames from "../../src/classnames";

/// <reference types="cypress" />

describe('basic', () => {

    beforeEach(() => {
        cy.visit('/tests/templates/default')
    })

    it('should open and close result list on click onto the widget-div', () => {
        cy.get('body').tab()
        cy.resultListShouldBeOpen()

        cy.get('body').type('{ESC}');
        cy.resultListShouldBeClosed()
        cy.get('.choosy-input').should('be.focused')
    })

    it('should be possible to select all items from select list to choosy-widget', function () {
        cy.get('body').tab()
        cy.get('select#cars').children().each(($el, index, list) => {

            cy.focused().type('{downArrow}')

            // a result-item got selected
            cy.get('.choosy-result-list-container').find('.choosy-result-list > .choosy-result-item.active').should('exist')

            // the selected item is the first inside the result-list and has the active class
            cy.get('.choosy-result-list-container').find('.choosy-result-list').children().first()
                .should('have.class', 'choosy-result-item')
                .and('have.class', 'active')

                // select the item and make sure the widget-list contains the selection on the correct position
                .then(($el) => {
                    cy.focused().type('{enter}')
                    cy.get('.choosy-list').children().eq(index)
                        .should('have.class', 'choosy-item')
                        .contains($el.text()).should('exist')
                })

            function isLastIteration() {
                return index + 1 === list.length;
            }

            // result list is closed when nothing is to select anymore
            isLastIteration() ? cy.resultListShouldBeClosed() : cy.resultListShouldBeOpen()

            // on last iteration make sure list is complete
            if (isLastIteration()) {
                cy.get('.choosy-list').children('.choosy-item').should('have.lengthOf', list.length)
            }
        })
    });

    it('should be possible to unselect first item', function () {
        cy.addAllResultsToWidgetList('keyboard')

        // todo: at the moment this works with click - keyboard navigation for this is not supported yet
        cy.testUnselectionOfOneItem('first', 'keyboard')
        cy.exactlyOneItemGotRemoved()
    });

    it('should be possible to unselect last item', function () {
        cy.addAllResultsToWidgetList('keyboard')
        cy.testUnselectionOfOneItem('last', 'keyboard')
        cy.exactlyOneItemGotRemoved()
    });

    it('should be possible to reselect an unselected item', function () {
        cy.testAdditionToWidgetList(0, 'keyboard')

        cy.widgetShouldContain('Volvo', 0)

        cy.testAdditionToWidgetList(0, 'keyboard')

        cy.widgetShouldContain('Volvo', 0)
        cy.widgetShouldContain('Saab', 1)

        cy.testUnselectionOfOneItem('last', 'keyboard')

        cy.widgetShouldContain('Volvo', 0)
        cy.widgetShouldNotContain('Saab')

        cy.testAdditionToWidgetList(0, 'keyboard')

        cy.widgetShouldContain('Saab', 1)
    });

    it.only('should be possible to write and select from result list', function () {

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

        cy.focused().type('{downArrow}{enter}')
        cy.resultListShouldBeOpen()
        cy.testWidgetContent('Volvo')
        cy.testSelectContent('volvo')
    })

    it('should limit the amount of shown items by default', function () {
        cy.get('body').tab()
        cy.get('.choosy-result-list-container').find('.choosy-result-list').should('exist')

            // we go with 6 items (default is 5 - because the next item is visible by the drop shadow)
            .children('.' + classnames.result_list_item + ':visible').should('have.lengthOf', 6)
            .contains('Saab').should('exist')
            .contains('Audi').should('not.exist')
    })

    it('should not allow you to input empty items', function () {
        cy.get('body').tab()
        cy.focused().type('{enter}')
        cy.resultListShouldBeOpen()

        cy.get('.choosy-list').children('.' + classnames.item)
            .should('have.length', 0)
    });

})