/**
 * @class Component
 */
export default class Component {

    /**
     *
     * @param {Choosy} app
     * @param {Element|undefined} element
     * @constructor
     */
    constructor(app, element) {

        /**
         *
         * @type {Choosy}
         */
        this.$app = app

        /**
         * @type {Element}
         */
        this.element = element

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

    /**
     *
     * @returns {Config}
     */
    get $config() {
        return this.$app.config
    }
}