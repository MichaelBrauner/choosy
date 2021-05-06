import elements from "./../elements";
import InitialElement from "./InitialElement";
import classnames from "../classnames";
import ResultList from "./ResultList";
import TagList from "./TagList";
import Component from "./Component";

export class Widget extends Component {

    initialElement

    tagList
    resultList

    /**
     *
     * @param {Element} element
     * @param {Choosy} app
     */
    constructor(element, app) {
        super(app, elements.widget);

        this.initialElement = new InitialElement(element, app)

        this.resultList = new ResultList(this.element.querySelector('.' + classnames.result_list_container), app)
        this.tagList = new TagList(this.element.querySelector('.' + classnames.list), app)

        this.initialElement.attachWidget(this.element)
        this.registerListeners()
    }

    registerListeners() {

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

    #focusInput() {
        this.tagList.textInput.focus()
    }

    update(triggerChangeEvent) {
        this.appendNewSelectOptions()
        this.initialElement.update(triggerChangeEvent)
        this.updateTagList()
        this.closeResultListBox()
        this.clearTextInput()
        this.limit()
        this.updateConfigOptions()
    }

    appendNewSelectOptions() {

        this.$option.all.forEach(option => {
            if (this.$option.isNew(option)) {
                this.initialElement.appendOption(option)
            }
        })

        this.initialElement.clean()
    }

    updateTagList() {
        this.tagList.remove()
        this.tagList = TagList.create(this.$option, this.$app)
        this.element.append(this.tagList.element)
    }

    closeResultListBox() {
        this.resultList.closeResultBox()
    }

    clearTextInput() {
        this.tagList.textInput.clear()
    }

    static get selector() {
        return `.${classnames.widget}`
    }

    limit() {
        if (!this.$app.optionVoter.canAdd()) {
            this.tagList.textInput.element.maxLength = 0
        } else {
            this.tagList.textInput.element.maxLength = 524288
        }
    }

    updateConfigOptions() {
        this.$config.resolveEnabled()
    }

    disable() {
        this.element.classList.add('disabled')
        this.tagList.textInput.element.tabIndex = -1
    }

    enable() {
        this.element.classList.remove('disabled')
        this.tagList.textInput.element.tabIndex = 0
    }

}