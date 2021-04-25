import Component from "./Component";
import elements from "../elements";

export default class InitialElement extends Component{

    /**
     *
     * @param {Element} element
     * @param {Choosy} app
     */
    constructor(element, app) {
        super(element, app)

        this.storeInitialData(app)
        this.hide()

        this.registerListeners(app)
    }

    hide() {
        this.element.style.display = 'none'
    }

    attachWidget(widget) {
        this.element.parentElement.append(widget)
    }

    storeInitialData() {
        this.$app.store.initialData = Array.from(this.getAllOptions)
            .map((option) => {
                return this.$store.options.getModel(option)
            })
    }

    get getAllOptions() {
        return Array.from(this.element.querySelectorAll('option'))
    }

    appendOption(option) {
        const newOption = elements.selectOption
        newOption.value = '__new_option__'
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

    update() {
        this.element.querySelectorAll('option').forEach(option => {

            if (this.$store.options.findByOptionElement(option)?.selected) {
                option.selected = true
                return
            }

            option.selected = false
        })
    }

    get isMultiple() {
        return this.element.multiple
    }

}