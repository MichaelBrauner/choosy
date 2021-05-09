import Component from "../components/Component";

export default class ResultListVoter extends Component{

    constructor(app) {
        super(app, undefined)
    }

    canOpenAll() {
        return this.$store.inputIsEmpty && this.$app.optionVoter.canAdd()
    }

    canOpen() {
        return !this.$store.inputIsEmpty && this.$app.optionVoter.canAdd()
    }
}