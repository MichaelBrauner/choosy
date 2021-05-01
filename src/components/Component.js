export default class Component {

    /**
     *
     * @param {Element=} element
     * @param {Choosy} app
     */
    constructor(element, app) {

        /**
         * @type {Element}
         */
        this.element = element

        /**
         *
         * @type {Choosy}
         */
        this.$app = app

    }

    /**
     *
     * @returns {Store}
     */
    get $store() {
        return this.$app.store
    }

    /**
     *
     * @returns {Navigation}
     */
    get $navigation() {
        return this.$app.navigation
    }

    /**
     *
     * @returns {Event}
     */
    get $event() {
        return this.$app.event
    }

    /**
     *
     * @returns {Option}
     */
    get $option() {
        return this.$app.store.options
    }

    /**
     *
     * @returns {TextInput}
     */
    get $textInput() {
        return this.$app.widget.tagList.textInput
    }

    /**
     *
     * @returns {Widget}
     */
    get $widget() {
        return this.$app.widget
    }
}