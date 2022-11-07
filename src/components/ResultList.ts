import ResultListList from "./ResultListList";
import classnames from "../classnames";
import Component from "./Component";
import Choosy from "../choosy";


export default class ResultList extends Component {

    list: ResultListList

    closeEvents = [
        'widget_clicked_outside',
        'input_pressed_esc',
        'input_pressed_tab',
        'window_blur'
    ]

    constructor(app: Choosy, element: HTMLDivElement) {
        super(app, element);

        this.appendList()
        this.registerEventListener()
    }

    registerEventListener(): void {

        this.closeEvents.forEach(eventName => {
            this.$event.on(eventName, () => this.closeResultBox())
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

    createBox(): void {
        this.openResultBox()
        this.list.setResultBoxHeight()
    }

    openResultBox(): void {
        if (!this.open) {
            this.element.style.display = 'block'
        }
    }

    get open(): boolean {
        return this.element.style.display !== 'none'
    }

    isOpen(widget: HTMLDivElement): boolean {
        return (widget.querySelector(ResultList.selector) as HTMLDivElement)
            .style.display === 'block'
    }

    closeResultBox(): void {
        this.#clean()

        if (this.open)
            this.element.style.display = 'none'

        this.$navigation.clear()
    }

    #clean(): void {
        this.destroy()
        this.appendList()
    }

    appendList(): void {
        this.list = new ResultListList(this.$app, this.element)
    }

    static get selector(): string {
        return `.${classnames.result_list_container}`
    }

    destroy(): void {
        this.list.destroy()
    }
}