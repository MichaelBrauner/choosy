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
        super(elements.widget, app);

        this.initialElement = new InitialElement(element, app)

        this.resultList = new ResultList(this.element.querySelector('.' + classnames.result_list_container), app)
        this.tagList = new TagList(this.element.querySelector('.' + classnames.list), app)

        this.initialElement.attachWidget(this.element)
        this.registerListeners()
    }

    registerListeners() {

        this.element.addEventListener('click', (event) => {
            this.$app.inputVoter.shouldFocusAfterEvent(event) && this.#focusInput()
        })

        this.$event.on('option_chosen', () => {
            this.update()
            this.#focusInput()
        })

        this.$event.on('option_unselected', () => {
            this.update()
            this.#focusInput()
        })

    }

    #focusInput() {
        this.tagList.textInput.focus()
    }

    update() {
        this.appendNewSelectOptions()
        this.updateTagList()
        this.closeResultListBox()
        this.clearTextInput()
        this.limit()
    }

    appendNewSelectOptions() {
        this.$option.all.forEach(option => {
            if (this.$option.isNew(option)) {
                this.initialElement.appendOption(option)
            }
        })
        this.initialElement.update()
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

}