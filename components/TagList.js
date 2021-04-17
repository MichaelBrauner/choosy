import elements from "../../choices/src/elements";
import classnames from "../../choices/src/classnames";
import Component from "./Component";
import Option from "../option";
import TextInput from "./TextInput";

export default class TagList extends Component {

    textInput

    constructor(element) {
        super(element)

        this.appendTextInput();
        this.registerEventListeners()
    }

    appendTextInput() {
        this.textInput = new TextInput(elements.textInput)
        this.element.append(this.textInput.element)
    }

    registerEventListeners() {
        this.element.addEventListener('click', event => {

            if (this.clickedOnRemoveButton(event.target)) {
                event.preventDefault()

                Option.unselect(
                    Option.findByTextContent(this.findClickedTag(event).innerHTML)
                )
            }
        })
    }

    clickedOnRemoveButton(target) {
        if (target.matches('button.' + classnames.remove_button))
            return true

        if (target.matches('svg.' + classnames.remove_button_svg))
            return true

        return !!target.matches('path');
    }

    static create() {
        const list = elements.list

        Option.selected.forEach(item => list.append(elements.getItem(item.content)))

        return new TagList(list)
    }

    remove() {
        this.element.remove()
    }

    findClickedTag(event) {
        return event.target.closest('.' + classnames.item)
            .querySelector('.' + classnames.item_text_span)
    }

    static get selector() {
        return '.' + classnames.list
    }

}
