import Component from "./Component";
import TextInput from "./TextInput";
import classnames from "../classnames";
import elements from "../elements";

export default class TagList extends Component {

    textInput

    /**
     *
     * @param {Element=} element
     * @param {Choosy} app
     */
    constructor(element, app) {
        super(element, app)

        this.appendTextInput();
        this.registerEventListeners()
    }

    appendTextInput() {
        this.textInput = new TextInput(elements.textInput, this.$app)
        this.element.append(this.textInput.element)
    }

    registerEventListeners() {
        this.element.addEventListener('click', event => {

            if (this.clickedOnRemoveButton(event.target)) {
                event.preventDefault()

                this.$option.unselect(
                    this.$option.findByTextContent(this.findClickedTag(event).innerHTML)
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

    /**
     *
     * @param {Option} options
     * @param {Choosy} app
     * @returns {TagList}
     */
    static create(options, app) {
        const list = elements.list

        options.selected.forEach(item => list.append(elements.getItem(item.content)))

        return new TagList(list, app)
    }

    remove() {
        this.textInput.destroy()
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
