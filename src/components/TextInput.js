import Component from "./Component";
import {debounce, getLastOfArray} from "../util";
import classnames from "../classnames";

export default class TextInput extends Component {

    /**
     *
     * @param {Element=} element
     * @param {Choosy} app
     */
    constructor(element, app) {
        super(app, element)

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
                this.$event.emit('input_pressed_tab')
            }

            this.$navigation.events.handle(event)
        })

        this.element.addEventListener('input',
            debounce(event => {
                this.$event.emit('input_input_debounced', event)
            }, 250)
        )

        this.element.addEventListener('focus', () => {
            this.$event.emit('input_focus')
        })

        this.element.addEventListener('blur', (event) => {
            this.$event.emit('input_blur', event)
        })

        this.$event.on('input_cleared', this.resetValue)
    }

    get length() {
        return this.$store.input?.length
    }

    get hasMinLength() {
        return this.length >= 2
    }

    adjustWidth() {
        this.element.style.width = `${this.length ? this.length + 1 : 1}ch`
    }

    refreshState() {
        this.$store.input = this.element.value
    }

    limit(event) {
        if (!this.$app.optionVoter.canAdd())
            event.preventDefault()
    }

    static get selector() {
        return '.' + classnames.input
    }

    clear() {
        this.$store.input = null
        this.$event.emit('input_cleared')
    }

    enterKeyEvent(event) {
        event.preventDefault()

        if (this.hasMinLength || this.$app.optionVoter.canAdd())
            this.$option.choose()
    }

    escapeKeyEvent() {
        this.$event.emit('input_pressed_esc')
    }

    backspaceKeyEvent(event) {
        if (!this.$store.inputIsEmpty || this.$option.isListEmpty)
            return

        event.preventDefault()
        this.$option.unselect(getLastOfArray(this.$option.selected))
    }

    get isFocussed() {
        return document.activeElement.classList.contains(classnames.input)
    }

    focus() {
        if (!this.isFocussed)
            this.element.focus()
    }

    resetValue = () => {
        this.element.value = null
    }

    destroy() {
        this.$event.off('input_cleared', this.resetValue)
    }
}