import Component from "./Component";
import {debounce, getLastOfArray} from "../util";
import classnames from "../classnames";
import Choosy from "../choosy";

export default class TextInput extends Component {

    element: HTMLInputElement;

    constructor(app: Choosy, element: HTMLInputElement) {
        super(app, element)
        this.registerListeners()
    }

    registerListeners(): void {

        this.element.addEventListener('input', () => {
            this.refreshState()
            this.adjustWidth()
        })

        this.element.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                this.enterKeyEvent(event)
            }

            if (event.key === 'Escape') {
                this.escapeKeyEvent()
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
            console.log('hey')
            this.$event.emit('input_focus')
        })

        this.element.addEventListener('blur', (event) => {
            this.$event.emit('input_blur', event)
        })

        this.$event.on('input_cleared', this.resetValue)
    }

    get length(): number | undefined {
        return this.$store.input?.length
    }

    get hasMinLength(): boolean {
        return this.length >= 2
    }

    adjustWidth(): void {
        this.element.style.width = `${this.length ? this.length + 1 : 1}ch`
    }

    refreshState(): void {
        this.$store.input = this.element.value
    }

    limit(event: Event): void {
        if (!this.$app.optionVoter.canAdd())
            event.preventDefault()
    }

    static get selector(): string {
        return '.' + classnames.input
    }

    clear(): void {
        this.$store.input = null
        this.$event.emit('input_cleared')
    }

    enterKeyEvent(event: Event): void {
        event.preventDefault()

        if (!!this.hasMinLength || this.$app.optionVoter.canAdd())
            this.$option.choose()
    }

    escapeKeyEvent(): void {
        this.$event.emit('input_pressed_esc')
    }

    backspaceKeyEvent(event: Event): void {
        if (!this.$store.inputIsEmpty || this.$option.isListEmpty)
            return

        event.preventDefault()
        this.$option.unselect(getLastOfArray(this.$option.selected))
    }

    get isFocussed(): boolean {
        return document.activeElement.classList.contains(classnames.input)
    }

    focus(): void {
        if (!this.isFocussed)
            this.element.focus()
    }

    resetValue(): void {
        if (this)
            this.element.value = null
    }

    destroy(): void {
        this.$event.off('input_cleared', this.resetValue)
    }

    disable(): void {
       this.element.setAttribute('disabled', '')
    }
}