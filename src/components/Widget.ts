import elements from "./../elements";
import InitialElement from "./InitialElement";
import classnames from "../classnames";
import ResultList from "./ResultList";
import TagList from "./TagList";
import Component from "./Component";
import Choosy from "../choosy";

export default class Widget extends Component {

    resultList: ResultList;
    tagList: TagList;
    initialElement: InitialElement;
    element: HTMLSelectElement;

    constructor(element: HTMLSelectElement, app: Choosy) {
        super(app, elements.widget);

        this.initialElement = new InitialElement(app, element)
        this.resultList = new ResultList(app, this.element.querySelector('.' + classnames.result_list_container))
        this.tagList = new TagList(app, this.element.querySelector('.' + classnames.list))
        this.initialElement.attachWidget(this.element)
        this.registerListeners()
    }

    registerListeners(): void {

        this.element.addEventListener('click', (event) => {
            this.$app.inputVoter.shouldFocusOnWidgetClick(event) && this.#focusInput()
        })

        this.$event.on('option_chosen', () => {
            this.update(false)
            this.#focusInput()
        })

        this.$event.on('option_unselected', () => {
            this.update(false)
            this.#focusInput()
        })
    }

    #focusInput(): void {
        this.tagList.textInput.focus()
    }

    update(triggerChangeEvent): void {
        this.appendNewSelectOptions()
        this.initialElement.update(triggerChangeEvent)
        this.updateTagList()
        this.closeResultListBox()
        this.clearTextInput()
        this.limit()
        this.updateConfigOptions()
    }

    appendNewSelectOptions(): void {
        this.$option.all.forEach(option => {
            if (this.$option.isNew(option) && !this.initialElement.isOptionCreated(option))
                this.initialElement.appendOption(option)
        })

        this.initialElement.clean()
    }

    updateTagList(): void {
        this.tagList.remove()
        this.tagList = TagList.create(this.$option, this.$app)
        this.element.append(this.tagList.element)
    }

    closeResultListBox(): void {
        this.resultList.closeResultBox()
    }

    clearTextInput(): void {
        this.tagList.textInput.clear()
    }

    static get selector(): string {
        return `.${classnames.widget}`
    }

    limit(): void {
        if (!this.$app.optionVoter.canAdd()) {
            this.tagList.textInput.element.maxLength = 0
        } else {
            this.tagList.textInput.element.maxLength = 524288
        }
    }

    updateConfigOptions(): void {
        this.$config.resolveEnabled()
    }

    disable(): void {
        this.element.classList.add('disabled')
        this.tagList.textInput.element.tabIndex = -1
    }

    enable(): void {
        this.element.classList.remove('disabled')
        this.tagList.textInput.element.tabIndex = 0
    }

    destroy(): void {
        this.tagList.remove()
        this.resultList.destroy()
        this.element.remove()
    }

}