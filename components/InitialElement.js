import Component from "./Component";
import Store from "../store";
import Option from "../option";
import elements from "../elements";
import Event from "../event";

export default class InitialElement extends Component {

    constructor(element) {
        super(element)

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
        Store.initialData = Array.from(this.getAllOptions)
            .map((option) => {
                return Option.getModel(option)
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
        Event.on('option_chosen', () => {
            this.update()
        })

        Event.on('option_unselected', () => {
            this.update()
        })
    }

    update() {
        this.element.querySelectorAll('option').forEach(option => {

            if (Option.findByOptionElement(option)?.selected) {
                option.selected = 'selected'
                return
            }

            option.selected = false
        })
    }

    get isMultiple() {
        return this.element.multiple
    }
}