import classnames from "../classnames";
import elements from "../elements";
import Component from "./Component";

/**
 * @extends Component
 */
export default class ResultListList extends Component {

    /**
     *
     * @param resultBox
     * @param {Choosy} app
     */
    constructor(resultBox, app) {
        super(app, undefined);

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

        this.$event.off('navigation_action')

    }

    createListAndScroll() {
        this.createResultList()
        this.scrollToView()
    }

    registerEventListener() {
        this.chooseListener()

        this.$event.on('navigation_action', () => {
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
            this.$option.choose(
                this.$option.findByTextContent(value)
            )
            return
        }

        if (!this.$option.equalToInput) {
            this.$option.choose()
        }
    }

    createListResults() {

        this.#clean()

        this.append(
            this.results
        )

        if (!this.$option.equalToInput && this.$textInput.hasMinLength) {
            this.appendAddItemToList()
        }
    }

    createListAllResults() {

        this.#clean()

        this.append(
            this.$option.all
        )
    }

    createResultList() {
        if (this.$app.resultListVoter.canOpenAll())
            this.createListAllResults()

        if (this.$app.resultListVoter.canOpen())
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

            if (this.$navigation.isAddItem())
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

        if (this.$navigation.isActive(option))
            item.classList.add(classnames.result_list_item_active)

        item.innerHTML = option.content
        return item
    }

    isEmpty(widget) {
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

    get results() {

        if (this.$app.resultListVoter.canOpenAll())
            return this.$option.all ?? []

        if (this.$app.resultListVoter.canOpen())
            return this.$textInput.hasMinLength ? this.$option.startingWithInput : []

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
        const option = this.$navigation.item

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
