import {compareOptions} from "./util";
import Component from "./components/Component";
import OptionModel from "./model/OptionModel";

export default class Option extends Component {

    options: OptionModel[];

    get all() {
        return this.options.filter(option => {
            return !!option.content
        })
    }

    get allButSelected() {
        return this.options.filter(option => {
            return !!option.content && !this.isSelected(option)
        })
    }

    get startingWithInput() {
        return this.options.filter(option => option.content.includes(this.$store.input) && !option.selected)
    }

    get equalToInput() {
        return this.options.find(option => option.content === this.$store.input)
    }

    get selected() {
        return this.options
            .filter(option => option.selected)
            .sort((a, b) => a.timestamp - b.timestamp)
    }

    isSelected(option: OptionModel): boolean {
        const item = this.findByTextContent(option.content)
        return item && item.selected
    }

    findByTextContent(value: string): OptionModel {
        return this.options.find(option => option.content === value)
    }

    findByOptionElement(optionElement: HTMLOptionElement): OptionModel {
        return this.options.find(option => {

            if (optionElement.value === null)
                return option.content === optionElement.innerHTML

            if (optionElement.value.startsWith('__new_option__')) {
                return option.value === null && option.content === optionElement.innerHTML
            }

            return option.value === optionElement.value && option.content === optionElement.innerHTML
        })
    }


    choose(option: OptionModel | undefined = undefined): void {

        if (option) {
            this.select(option)
        } else {
            if (this.$navigation.item) {
                this.selectNavigationItem()
            } else {
                this.selectInputValue()
            }
        }

        this.$event.emit('option_chosen', option)
    }

    append(option: OptionModel | undefined = undefined): OptionModel | null {

        if (option) {
            return null
        }

        const storeIndex = this.options.push(this.getModel()) - 1

        return this.options[storeIndex]
    }

    getModel(option: HTMLOptionElement | undefined = undefined): OptionModel {
        return new OptionModel(
            option?.value,
            option?.innerHTML ?? this.$store.input
        );
    }

    select(option: OptionModel): void {
        this.options.map(item => {
            if (item.content !== option.content)
                return

            item.selected = true
            item.timestamp = Date.now()
        })
    }

    unselect(option: OptionModel): void {

        this.options.map(item => {

            if (item.content !== option.content)
                return

            item.selected = false
        })

        if (option.value === null) {
            this.removeAllUnselectedNew()
        }

        this.$event.emit('option_unselected')
        this.#clean()
    }

    isNew(option: OptionModel): boolean {
        return !this.$store.initialData.find(item => compareOptions(item, option))
    }

    #clean(): void {
        this.options = this.options.filter(item => {
            return !this.isNew(item) || item.selected
        })
    }

    get isListEmpty(): boolean {
        return !this.selected.length
    }

    selectNavigationItem(): void {

        if (this.$navigation.item.isAddition()) {
            this.selectInputValue()
            return
        }

        this.select(this.$navigation.item)
    }

    selectInputValue(): void {
        this.select(this.append())
    }

    get allTaken(): boolean {

        console.log(this.$config.options.limit)
        if (!this.$config.options.limit) return false

        return !(this.$app.config.options.limit > this.selected?.length)
    }

    removeAllUnselectedNew(): void {
        this.options = this.options.filter(item => item.value || item.selected)
    }

}