import Component from "../components/Component";

export default class OptionVoter extends Component{

    constructor(app) {
        super(app, undefined);
    }

    canAdd() {
        console.log(this.$app.store.options)
        return !this.$app.store.options.allTaken
    }
}