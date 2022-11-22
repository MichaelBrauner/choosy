import Component from "./Component";
import elements from "../elements";
import Choosy from "../choosy";
import OptionModel from "../model/OptionModel";
import ChoosyHTMLSelectElement from "../element/ChoosyHTMLSelectElement";

export default class InitialElement extends Component {
    public element: ChoosyHTMLSelectElement;

    constructor(app: Choosy, element: HTMLSelectElement) {
        super(app, element)

        this.storeInitialData()
        this.hide()

        this.registerListeners()
    }

    hide(): void {
        this.element.style.display = 'none'
    }

    attachWidget(widget: HTMLSelectElement): void {
        this.element.parentElement.append(widget)
    }

    storeInitialData(): void {
        this.$app.store.initialData = Array.from(this.getAllOptions)
            .map(option => this.$store.options.getModel(option))
    }

    get getAllOptions(): HTMLOptionElement[] {
        return Array.from(this.element.querySelectorAll('option'))
    }

    appendOption(option: OptionModel): HTMLOptionElement {
        const newOptionEl = elements.selectOption
        newOptionEl.value = '__new_option__' + option.content
        newOptionEl.innerHTML = option.content

        this.element.append(newOptionEl)
        return newOptionEl
    }

    registerListeners(): void {

        this.$event.on('option_chosen', () => {
            this.update()
        })

        this.$event.on('option_unselected', () => {
            this.update()
        })
    }

    update(triggerChangeEvent: boolean = true): void {

        this.element.querySelectorAll('option').forEach(option => {

            if (this.$store.options.findByOptionElement(option)?.selected) {
                option.selected = true
                return
            }

            option.selected = false
        })

       triggerChangeEvent && this.triggerChangeEvent()

    }

    triggerChangeEvent(): void {
        this.element.dispatchEvent(new Event('change'))
    }

    get isMultiple(): boolean {
        return this.element.multiple
    }

    updateOptionsData(): void {
        this.storeInitialData()
        this.$option.options = Array.from(this.getAllOptions)
            .map(option => this.$store.options.getModel(option))

        this.$widget.update(false)
    }

    clean(): void {
        this.getAllOptions.forEach(element => {
            if (this.isOptionNew(element) && !this.isSelected(element)) {
                element.remove()
            }
        })
    }

    isOptionNew(element): boolean {
        return element.value.startsWith('__new_option__')
    }

    isSelected(element): boolean {
        return !!this.$option.selected.find(option => {
            return element.textContent === option.content
        })
    }

    isOptionCreated(option: OptionModel): HTMLOptionElement {
        return this.getAllOptions.find((select) => {
            return option.content === this.extractNewOptionsValue(select)
        })
    }

    extractNewOptionsValue(selectOption: HTMLOptionElement): string | undefined {
        if (this.isOptionNew(selectOption))
            return selectOption.value.replace('__new_option__', '')

        return undefined;
    }

}