import classnames from "./classnames";

export default {

    get textInput() {
        const input = this.create('input', 'text', [classnames.input])
        input.style.width = '1ch'

        return input
    },

    get widget() {
        const widget = this.create('div', null, [classnames.widget])
        widget.append(this.list)

        widget.append(this.resultList)
        return widget
    },

    get list() {
        return this.create('div', null, [classnames.list])
    },

    get removeButton(): HTMLButtonElement {
        const btn = this.create('button', null, [classnames.remove_button])
        btn.append(this.removeSVG)

        // disable tabbing into button
        // because otherwise the input would not be accessible from keyboard navigation by tabbing anymore
        // because buttons are in the way
        btn.tabIndex = -1
        return btn
    },

    get removeSVG() {
        const svg = new DOMParser().parseFromString(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill="currentColor" class="${classnames.remove_button_svg}">
            <path fill-rule='evenodd'
                  d='M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z'></path>
            </svg>`, 'text/html');

        return svg.body.firstChild
    },

    get resultList() {
        const wrapper = this.create('div', null, [classnames.result_list_container])
        wrapper.style.display = 'none'

        return wrapper
    },

    get resultListList() {
        return this.create('ul', null, [classnames.result_list])
    },

    get resultItem(): HTMLLIElement {
        return this.create('li', null, [classnames.result_list_item])
    },

    get addItem() {
        const item = this.resultItem
        item.classList.add(classnames.add_item)
        item.innerHTML = 'Add new'

        return item
    },

    get selectOption(): HTMLOptionElement {
        return this.create('option', null)
    },

    getItem(text) {
        const item = this.create('div', null, [classnames.item])
        item.append(this.getItemTextSpan(text))
        item.append(this.removeButton)

        return item
    },

    getItemTextSpan(text) {
        const span = this.create('span', null, [classnames.item_text_span])
        span.innerHTML = text
        return span
    },

    create(tagName, type = null, classes = []) {
        const element = document.createElement(tagName)

        if (type)
            element.type = type

        classes.forEach((name) => {
            element.classList.add(name)
        })

        return element
    }

}