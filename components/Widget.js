import elements from "./../elements";
import InitialElement from "./InitialElement";
import TextInput from "./TextInput";
import classnames from "../classnames";
import ResultList from "./ResultList";
import Store from "../store";
import Event from "../event";
import Option from "../option";
import TagList from "./TagList";
import Navigation from "./Navigation";
import OptionVoter from "../voter/OptionVoter";
import InputVoter from "../voter/InputVoter"

export class Widget {

    initialElement
    element

    tagList
    resultList
    navigation

    store = Store

    constructor(initialElement) {

        this.initialElement = new InitialElement(initialElement)
        this.element = elements.widget

        // this.textInput = new TextInput(this.element.querySelector('.' + classnames.input))
        this.resultList = new ResultList(this.element.querySelector('.' + classnames.result_list_container))
        this.tagList = new TagList(this.element.querySelector('.' + classnames.list))

        this.initialElement.attachWidget(this.element)
        this.navigation = Navigation

        this.registerListeners()
    }

    registerListeners() {

        this.element.addEventListener('click', (event) => {
            InputVoter.shouldFocusAfterEvent(event) && this.#focusInput()
        })

        Event.on('option_chosen', () => {
            this.update()
            this.#focusInput()
        })

        Event.on('option_unselected', () => {
            this.update()
            this.#focusInput()
        })

    }

    #focusInput() {
        this.tagList.textInput.focus()
        // Event.emit('input_focus')
    }

    update() {
        this.appendNewSelectOptions()
        this.updateTagList()
        this.closeResultListBox()
        this.clearTextInput()
        this.limit()
    }

    appendNewSelectOptions() {
        Store.options.all.forEach(option => {
            if (Option.isNew(option)) {
                this.initialElement.appendOption(option)
            }
        })
    }

    updateTagList() {
        this.tagList.remove()
        this.tagList = TagList.create()
        this.element.append(this.tagList.element)
    }

    closeResultListBox() {
        this.resultList.closeResultBox()
    }

    clearTextInput() {
        TextInput.clear()
    }

    static get selector() {
        return `.${classnames.widget}`
    }

    limit() {
        if (!OptionVoter.canAdd()) {
            this.tagList.textInput.element.maxLength = 0
        } else {
            this.tagList.textInput.element.maxLength = 524288
        }
    }
}