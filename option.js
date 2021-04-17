import Store from "./store";
import Event from "./event";
import {compareOptions} from "./util";
import Navigation from "./components/Navigation";
import Config from "./components/Config";

export default class Option {

    all

    static get all() {
        return Store.options.all.filter(option => !!option.content)
    }

    static get startingWithInput() {
        return Option.all.filter(option => option.content.includes(Store.input) && !option.selected)
    }

    static get equalToInput() {
        return Option.all.find(option => option.content === Store.input)
    }

    static get selected() {
        return Option.all
            .filter(option => option.selected)
            .sort((a, b) => a.selected - b.selected)
    }

    static findByTextContent(value) {
        return Option.all.find(option => option.content === value)
    }

    static findByOptionElement(optionElement) {
        return Option.all.find(option => {

            if (optionElement.value === null)
                return option.content === optionElement.innerHTML

            return option.value === optionElement.value && option.content === optionElement.innerHTML
        })
    }


    static choose(option) {

        if (option) {
            Option.select(option)
        } else {
            if (Navigation.item) {
                Option.selectNavigationItem()
            } else {
                Option.selectInputValue()
            }
        }

        Event.emit('option_chosen')
    }

    static append(option) {

        if (option) {
            return
        }

        const storeIndex = Store.options.all.push(Option.getModel()) - 1

        return Store.options.all[storeIndex]
    }

    static getModel(option) {
        return {
            value: option ? option.value : null,
            content: option ? option.innerHTML : Store.input,
            selected: Option.decide(option),
            timestamp: (option && Option.decide(option)) ? Date.now() : null
        }
    }

    static select(option) {
        Store.options.all.map(item => {
            if (item.content !== option.content)
                return

            item.selected = true
            item.timestamp = Date.now
        })
    }

    static unselect(option) {

        Store.options.all.map(item => {
            if (item.content !== option.content)
                return

            item.selected = false
        })

        Event.emit('option_unselected')
        this.#clean()
    }

    static decide(option) {
        let selected = false

        if (option) {

            if (!option.value && !option.content)
                return false

            selected = option.selected
        }

        return selected
    }

    static isNew(option) {
        return !Store.initialData.find(item => compareOptions(item, option))
    }

    static #clean() {
        Store.options.all = Store.options.all.filter(item => {
            return !Option.isNew(item)
        })
    }

    static get isListEmpty() {
        return !Option.selected.length
    }

    static selectNavigationItem() {
        if (Navigation.item === 'add') {
            Option.selectInputValue()
        } else {
            Option.select(Navigation.item)
        }
    }

    static selectInputValue() {
        Option.select(
            Option.append()
        )
    }

    static get allTaken(){
        return !(Config.textInput.limit > Option.selected?.length)
    }
}