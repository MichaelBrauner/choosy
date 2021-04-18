import Event from "../event"
import Store from "../store";
import ResultListList from "./ResultListList";
import classnames from "../classnames";
import Navigation from "./Navigation";
import ResultListVoter from "../voter/ResultListVoter";

export default class ResultList {

    element
    list

    closeEvents = [
        'widget_clicked_outside',
        'input_pressed_esc',
        'input_pressed_tab',
        'window_blur'
    ]

    constructor(element) {
        this.element = element
        this.appendList()
        this.registerEventListener()
    }

    registerEventListener() {

        this.closeEvents.forEach(eventName => {
            Event.on(eventName, () => {
                this.closeResultBox()
            })
        })

        Event.on('input_input_debounced', () => {

            if (Store.inputIsEmpty) {
                this.closeResultBox()
                return
            }

            this.list.createResultList()
            this.createBox();
        })

        Event.on('input_focus', () => {
            this.list.createResultList()
            this.createBox();
        })

    }

    createBox() {
        this.openResultBox()
        this.list.setResultBoxHeight()
    }

    openResultBox() {
        if (!this.open) {
            this.element.style.display = 'block'
        }
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