import ResultListList from "./ResultListList";
import classnames from "../classnames";
import Component from "./Component";


/**
 * @extends Component
 */
export default class ResultList extends Component{

    list

    closeEvents = [
        'widget_clicked_outside',
        'input_pressed_esc',
        'input_pressed_tab',
        'window_blur'
    ]

    /**
     *
     * @param element
     * @param {Choosy} app
     */
    constructor(element, app) {
        super(app, element);

        this.appendList()
        this.registerEventListener()
    }

    registerEventListener() {

        this.closeEvents.forEach(eventName => {
            this.$event.on(eventName, () => {
                this.closeResultBox()
            })
        })

        this.$event.on('input_input_debounced', () => {

            if (this.$store.inputIsEmpty) {
                this.closeResultBox()
                return
            }

            this.list.createResultList()
            this.createBox();
        })

        this.$event.on('input_focus', () => {
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

        this.$navigation.clear()
    }

    #clean() {
        this.destroy()
        this.appendList()
    }

    appendList() {
        this.list = new ResultListList(this.element, this.$app)
    }

    isOpen(widget) {
        return widget.querySelector(ResultList.selector).style.display === 'block'
    }

    static get selector() {
        return `.${classnames.result_list_container}`
    }

    destroy() {
        this.list.destroy()
    }
}