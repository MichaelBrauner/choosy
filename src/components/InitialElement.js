import Component from "./Component";
import elements from "../elements";

export default class InitialElement extends Component {

    /**
     *
     * @param {Element} element
     * @param {Choosy} app
     */
    constructor(element, app) {
        super(app, element)

        this.storeInitialData()
        this.hide()

        this.registerListeners()
    }

    hide() {
        this.element.style.display = 'none'
    }

    attachWidget(widget) {
        this.element.parentElement.append(widget)
    }

    storeInitialData() {
        this.$app.store.initialData = Array.from(this.getAllOptions)
            .map(option => this.$store.options.getModel(option))
    }

    get getAllOptions() {
        return Array.from(this.element.querySelectorAll('option'))
    }

    appendOption(option) {
        const newOption = elements.selectOption
        newOption.value = '__new_option__' + option.content
        newOption.innerHTML = option.content

        this.element.append(newOption)
        return newOption
    }

    registerListeners() {

        this.$app.event.on('option_chosen', () => {
            this.update()
        })

        this.$app.event.on('option_unselected', () => {
            this.update()
        })
    }

    update(triggerChangeEvent) {

        this.element.querySelectorAll('option').forEach(option => {

            if (this.$store.options.findByOptionElement(option)?.selected) {
                option.selected = true
                return
            }

            option.selected = false
        })

        if (triggerChangeEvent ?? true) {
            this.triggerChangeEvent()
        }

        console.log(this.element.selectedOptions)

    }

    triggerChangeEvent() {
        this.element.dispatchEvent(new Event('change'))
    }

    get isMultiple() {
        return this.element.multiple
    }

    updateOptionsData() {
        this.storeInitialData()
        this.$option.options = Array.from(this.getAllOptions)
            .map(option => this.$store.options.getModel(option))

        this.$widget.update(false)
    }

    clean() {
        this.getAllOptions.forEach(element => {
            if(this.isOptionNew(element) && !this.isSelected(element)) {
                element.remove()
            }
        })
    }

    isOptionNew(element) {
        return element.value.startsWith('__new_option__')
    }

    isSelected(element) {
        return !!this.$option.selected.find(option => {
            return element.textContent === option.content
        })
    }

}