import Component from "./Component";
import TextInput from "./TextInput";
import classnames from "../classnames";
import elements from "../elements";
import Choosy from "../choosy";
import Option from "../option";

export default class TagList extends Component {

    textInput: TextInput;

    constructor(app: Choosy, element: HTMLDivElement) {
        super(app, element)

        this.appendTextInput();
        this.registerEventListeners()
    }

    appendTextInput(): void {
        this.textInput = new TextInput(this.$app, elements.textInput)

        if (!this.$config?.options.enabled) {
            this.textInput.disable()
        }

        this.element.append(this.textInput.element)
    }

    registerEventListeners(): void {
        this.element.addEventListener('click', event => {

            if (this.clickedOnRemoveButton(event.target)) {
                event.preventDefault()

                this.$option.unselect(
                    this.$option.findByTextContent(this.findClickedTag(event).innerHTML)
                )
            }
        })
    }

    clickedOnRemoveButton(target): Boolean {
        if (target.matches('button.' + classnames.remove_button))
            return true

        if (target.matches('svg.' + classnames.remove_button_svg))
            return true

        return !!target.matches('path');
    }

    static create(options: Option, app: Choosy): TagList {
        const list = elements.list
        options.selected.forEach(item => list.append(elements.getItem(item.content)))

        return new TagList(app, list)
    }

    remove(): void {
        this.textInput.destroy()
        this.element.remove()
    }

    findClickedTag(event): HTMLElement {
        return event.target.closest('.' + classnames.item)
            .querySelector('.' + classnames.item_text_span)
    }

    static get selector(): string {
        return '.' + classnames.list
    }

}
