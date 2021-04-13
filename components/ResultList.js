import Event from "../event"
import Store from "../store";
import ResultListList from "./ResultListList";
import classnames from "../classnames";
import Navigation from "./Navigation";

export default class ResultList {

    element
    list

    constructor(element) {
        this.element = element
        this.appendList()
        this.registerEventListener()
    }

    registerEventListener() {
        Event.on('widget_clicked_outside', () => {
            this.closeResultBox()
        })

        Event.on('input_pressed_esc', () => {
            this.closeResultBox()
        })

        Event.on('input_input_debounced', () => {

            if (Store.inputIsEmpty) {
                this.closeResultBox()
                return
            }

            this.list.createListResults()
            this.openResultBox()
            this.list.setResultBoxHeight()
        })

        Event.on('widget_focus', () => {
            if (Store.inputIsEmpty) {
                this.list.createListAllResults()
                this.openResultBox()
                this.list.setResultBoxHeight()
            }
        })
    }

    openResultBox() {
        if (!this.open)
            this.element.style.display = 'block'
    }

    get open() {
        return this.element.style.display !== 'none'
    }

    closeResultBox() {
        this.#clean()

        if (this.open)
            this.element.style.display = 'none'

        Navigation.clear()
    }

    #clean() {
        this.list.destroy()
        this.appendList()
    }

    appendList() {
        this.list = new ResultListList(this.element)
    }

    static isOpen(widget) {
        return widget.querySelector(ResultList.selector).style.display === 'block'
    }

    static get selector() {
        return `.${classnames.result_list_container}`
    }
}