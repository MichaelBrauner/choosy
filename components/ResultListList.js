import classnames from "../classnames";
import elements from "../elements";
import Option from "../option";
import TextInput from "./TextInput";
import Navigation from "./Navigation";
import Event from "../event";
import ResultListVoter from "../voter/ResultListVoter";

export default class ResultListList {


    element

    constructor(resultBox) {
        this.create(resultBox)

        this.registerEventListener()
    }

    create(resultBox) {
        const list = elements.resultListList
        resultBox.append(list)
        this.element = list
    }

    destroy() {
        this.element.remove()

        Event.off('navigation_action')

    }

    createListAndScroll() {
        this.createResultList()
        this.scrollToView()
    }

    registerEventListener() {
        this.chooseListener()

        Event.on('navigation_action', () => {
            this.createListAndScroll();
        })

    }

    chooseListener() {

        this.element.addEventListener('click', event => {

            if (event.target.matches(`li.${classnames.result_list_item}:not(.${classnames.add_item})`)) {
                this.choose(event.target.innerHTML)
                return
            }

            if (event.target.matches('li.' + classnames.add_item)) {
                this.choose();
            }

        })

    }

    choose(value) {

        if (value) {
            Option.choose(
                Option.findByTextContent(value)
            )
            return
        }

        if (!Option.equalToInput) {
            Option.choose()
        }
    }

    createListResults() {

        this.#clean()

        this.append(
            ResultListList.results
        )

        if (!Option.equalToInput && TextInput.hasMinLength) {
            this.appendAddItemToList()
        }
    }

    createListAllResults() {

        this.#clean()

        this.append(
            Option.all
        )
    }

    createResultList() {
        if (ResultListVoter.canOpenAll())
            this.createListAllResults()

        if (ResultListVoter.canOpen())
            this.createListResults()
    }

    append(options) {
        options.forEach(option => {

            if (this.hasOption(option))
                return

            this.appendElementToList(this.createResultItem(option))
        })
    }

    hasOption(option) {
        return Array.from(this.allListItems)
            .find(result => result.textContent === option.textContent)
    }

    appendAddItemToList() {
        if (!this.hasAddNewItem) {

            const element = elements.addItem

            if (Navigation.isAddItem())
                element.classList.add(classnames.result_list_item_active)

            this.appendElementToList(element)
        }
    }

    appendElementToList(element) {
        this.element.append(element)
    }

    get hasAddNewItem() {
        return this.element.querySelector('.' + classnames.add_item)
    }

    createResultItem(option) {

        const item = elements.resultItem

        if (Navigation.isActive(option))
            item.classList.add(classnames.result_list_item_active)

        item.innerHTML = option.content
        return item
    }

    static isEmpty(widget) {
        return !widget.querySelectorAll(
            `${ResultListList.selector} > .${classnames.result_list_item}`
        ).length
    }

    static get selector() {
        return `.${classnames.result_list}`
    }

    get allListItems() {
        return this.element.getElementsByTagName('li')
    }

    #clean() {
        const nodes = this.allListItems

        for (let i = 0, len = nodes.length; i !== len; ++i) {
            nodes[0].parentNode.removeChild(nodes[0]);
        }
    }

    static get results() {

        if (ResultListVoter.canOpenAll())
            return Option.all ?? []

        if (ResultListVoter.canOpen())
            return TextInput.hasMinLength ? Option.startingWithInput : []


    }

    setResultBoxHeight() {

        const items = this.allListItems

        const totalItems = items.length
        let result = 0

        if (totalItems > 5) {
            for (let i = 0; i < 5; i++) {
                result += items.item(i).offsetHeight
            }
        }

        this.element.style.height = result ? result + 'px' : 'auto'
    }

    scrollToView() {

        const activeElement = this.getActiveElement()
        if (activeElement) {
            activeElement.scrollIntoView({
                block: 'nearest',
                inline: 'nearest',
                behavior: 'smooth',
                boundary: this.element
            });
        }
    }

    getActiveElement() {
        const option = Navigation.item

        if (!option)
            return null

        return this.#findOptionElementByDataOption(option)

    }

    #findOptionElementByDataOption(option) {
        if (option === 'add')
            return this.element.querySelector(`.${classnames.add_item}`)
        return Array.from(this.allListItems).find(optionElement => {
            return optionElement?.innerHTML === option?.content
        })
    }

}
