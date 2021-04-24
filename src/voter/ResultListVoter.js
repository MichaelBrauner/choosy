export default class ResultListVoter {

    constructor(app) {
        this.$app = app
    }

    canOpenAll() {
        return this.$app.store.inputIsEmpty && this.$app.optionVoter.canAdd()
    }

    canOpen() {
        return !this.$app.store.inputIsEmpty && this.$app.optionVoter.canAdd()
    }
}