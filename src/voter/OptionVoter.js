export default class OptionVoter {

    constructor(app) {
        this.app = app
    }

    canAdd() {
        return !this.app.store.options.allTaken
    }
}