import Component from "./Component";
import {debounce, getLastOfArray} from "../util";
import Event from "../event";
import Store from "../store";
import Option from "../option";
import navigationEvents from "../events/navigationEvents";
import OptionVoter from "../voter/OptionVoter";
import classnames from "../classnames";

export default class TextInput extends Component {

    constructor(element) {
        super(element)

        this.registerListeners()
    }

    registerListeners() {

        this.element.addEventListener('input', () => {
            this.refreshState()
            this.adjustWidth()
        })

        this.element.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                this.enterKeyEvent(event)
            }

            if (event.key === 'Escape') {
                this.escapeKeyEvent(event)
            }

            if (event.key === 'Backspace') {
                this.backspaceKeyEvent(event)
            }

            if (event.key === 'Tab') {
                Event.emit('input_pressed_tab')
            }

            navigationEvents.handle(event)
        })

        this.element.addEventListener('input',
            debounce(event => {
                Event.emit('input_input_debounced', event)
            }, 250)
        )

        this.element.addEventListener('focus', () => {
            Event.emit('input_focus')
        })

        this.element.addEventListener('blur', (event) => {
            Event.emit('input_blur', event)
        })

        Event.on('input_cleared', () => {
            this.element.value = null
        })
    }

    static get length() {
        return Store.input?.length
    }

    static get hasMinLength() {
        return TextInput.length >= 2
    }

    adjustWidth() {
        this.element.style.width = `${TextInput.length ? TextInput.length + 1 : 1}ch`
    }

    refreshState() {
        Store.input = this.element.value
    }

    limit(event) {
        if (!OptionVoter.canAdd())
            event.preventDefault()
    }

    static get selector() {
        return '.' + classnames.input
    }

    static clear() {
        Store.input = null
        Event.emit('input_cleared')
    }

    enterKeyEvent(event) {
        event.preventDefault()

        if (TextInput.hasMinLength)
            Option.choose()
    }

    escapeKeyEvent() {
        Event.emit('input_pressed_esc')
    }

    backspaceKeyEvent(event) {
        if (!Store.inputIsEmpty || Option.isListEmpty)
            return

        event.preventDefault()
        Option.unselect(getLastOfArray(Option.selected))
    }

    get isFocussed() {
        return document.activeElement.classList.contains(classnames.input)
    }

    focus() {
        if (!this.isFocussed)
            this.element.focus()
    }
}