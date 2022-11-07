import classnames from "../classnames";
import elements from "../elements";
import Component from "./Component";
import Choosy from "../choosy";
import OptionModel from "../model/OptionModel";

export default class ResultListList extends Component {

    constructor(app: Choosy, resultBox: HTMLElement,) {
        super(app);

        this.create(resultBox)
        this.registerEventListener()

    }

    create(resultBox: HTMLElement): void {
        const list = elements.resultListList
        resultBox.append(list)
        this.element = list
    }

    destroy(): void {
        this.element.remove()
        this.$event.off('navigation_action')
    }

    createListAndScroll(): void {
        this.createResultList()
        this.scrollToView()
    }

    registerEventListener(): void {
        this.chooseListener()

        this.$event.on('navigation_action', () => {
            this.createListAndScroll();
        })

    }

    chooseListener(): void {

        this.element.addEventListener('click', event => {

            const target = event.target as HTMLElement;

            if (target.matches(`li.${classnames.result_list_item}:not(.${classnames.add_item})`)) {
                this.choose(target.innerHTML)
                return
            }

            if (target.matches('li.' + classnames.add_item)) {
                this.choose();
            }
        })
    }

    choose(value: string | undefined = undefined): void {

        if (value) {
            this.$option.choose(this.$option.findByTextContent(value))
            return
        }

        !this.$option.equalToInput && this.$option.choose()
    }

    createListResults(): void {

        this.#clean()
        this.append(this.results)

        if (!this.$option.equalToInput && this.$textInput.hasMinLength)
            this.appendAddItemToList()
    }

    createListAllResults(): void {
        this.#clean()
        this.append(this.$option.allButSelected)
    }

    createResultList(): void {

        if (this.$app.resultListVoter.canOpenAll())
            this.createListAllResults()

        if (this.$app.resultListVoter.canOpen())
            this.createListResults()
    }

    append(options: OptionModel[]): void {

        options.forEach(option => {
            if (this.hasOption(option))
                return

            this.appendElementToList(this.createResultItem(option))
        })
    }

    hasOption(option: OptionModel): HTMLLIElement {
        return Array.from(this.allListItems)
            .find(result => result.textContent === option.content)
    }

    appendAddItemToList(): void {

        if (!this.hasAddNewItem) {

            const element = elements.addItem

            if (this.$navigation.selectedItem.isAddition())
                element.classList.add(classnames.result_list_item_active)

            this.appendElementToList(element)
        }
    }

    appendElementToList(element): void {
        this.element.append(element)
    }

    get hasAddNewItem(): HTMLOptionElement {
        return this.element.querySelector('.' + classnames.add_item)
    }

    createResultItem(option): HTMLLIElement {

        const item = elements.resultItem

        if (this.$navigation.isActive(option))
            item.classList.add(classnames.result_list_item_active)

        item.innerHTML = option.content
        return item
    }

    isEmpty(widget): boolean {
        return !widget.querySelectorAll(
            `${ResultListList.selector} > .${classnames.result_list_item}`
        ).length
    }

    static get selector(): string {
        return `.${classnames.result_list}`
    }

    get allListItems(): HTMLCollectionOf<HTMLLIElement> {
        return this.element.getElementsByTagName('li')
    }

    #clean(): void {
        const nodes = this.allListItems

        for (let i = 0, len = nodes.length; i !== len; ++i) {
            nodes[0].parentNode.removeChild(nodes[0]);
        }
    }

    get results(): any[] {

        if (this.$app.resultListVoter.canOpenAll())
            return this.$option.all ?? []

        if (this.$app.resultListVoter.canOpen())
            return this.$textInput.hasMinLength ? this.$option.startingWithInput : []

        return [];
    }

    setResultBoxHeight(): void {

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

    scrollToView(): void {
        const activeElement = this.getActiveElement()

        if (activeElement)
            activeElement.scrollIntoView({
                block: 'nearest',
                inline: 'nearest',
                behavior: 'smooth'
            });
    }

    getActiveElement(): null|HTMLLIElement {
        const option = this.$navigation.item

        if (!option)
            return null

        return this.#findOptionElementByDataOption(option)

    }

    #findOptionElementByDataOption(option): null|HTMLLIElement {

        if (option.isAddition())
            return this.element.querySelector(`.${classnames.add_item}`)

        return Array.from(this.allListItems).find(optionElement => {
            return optionElement?.innerHTML === option?.content
        })
    }

}
