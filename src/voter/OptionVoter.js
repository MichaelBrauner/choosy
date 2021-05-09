import Component from "../components/Component";

export default class OptionVoter extends Component{

    constructor(app) {
        super(app, undefined);
    }

    canAdd() {
        return !this.$app.store.options.allTaken
    }
}