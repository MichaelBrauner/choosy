import {compareOptions} from "./util";
import Component from "./components/Component";

export default class Option extends Component {

    options

    constructor(app) {
        super(app, undefined);
    }

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
            .sort((a, b) => a.selected - b.selected)
    }

    /**
     *
     * @param {Object} option
     * @returns {boolean}
     */
    isSelected(option) {
        const item = this.findByTextContent(option.content)
        return item && item.selected
    }

    findByTextContent(value) {
        return this.options.find(option => option.content === value)
    }

    findByOptionElement(optionElement) {
        return this.options.find(option => {

            if (optionElement.value === null)
                return option.content === optionElement.innerHTML

            if (optionElement.value.startsWith('__new_option__')) {
                return option.value === null && option.content === optionElement.innerHTML
            }

            return option.value === optionElement.value && option.content === optionElement.innerHTML
        })
    }


    choose(option) {

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

    append(option) {
        if (option) {
            return
        }

        const storeIndex = this.options.push(this.getModel()) - 1

        return this.options[storeIndex]
    }

    getModel(option) {
        return {
            value: option ? option.value : null,
            content: option ? option.innerHTML : this.$store.input,
            selected: this.decide(option),
            timestamp: (option && this.decide(option)) ? Date.now() : null
        }
    }

    select(option) {
        this.options.map(item => {
            if (item.content !== option.content)
                return

            item.selected = true
            item.timestamp = Date.now()
        })
    }

    unselect(option) {

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

    decide(option) {
        let selected = false

        if (option) {

            if (!option.value && !option.content)
                return false

            selected = option.selected
        }

        return selected
    }

    isNew(option) {
        return !this.$store.initialData.find(item => compareOptions(item, option))
    }

    #clean() {
        this.options = this.options.filter(item => {
            return !this.isNew(item) || item.selected
        })
    }

    get isListEmpty() {
        return !this.selected.length
    }

    selectNavigationItem() {
        if (this.$navigation.item === 'add') {
            this.selectInputValue()
        } else {
            this.select(this.$navigation.item)
        }
    }

    selectInputValue() {
        this.select(
            this.append()
        )
    }

    /**
     * @returns {boolean}
     */
    get allTaken() {

        if (!this.$config.options.limit) return false

        return !(this.$app.config.options.limit > this.selected?.length)
    }

    removeAllUnselectedNew() {
        this.options = this.options.filter(item => item.value || item.selected)
    }

}