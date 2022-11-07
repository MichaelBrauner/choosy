import Component from "../components/Component";

export default class ResultListVoter extends Component{

    canOpenAll(): Boolean {
        return this.$store.inputIsEmpty && this.$app.optionVoter.canAdd()
    }

    canOpen(): Boolean {
        return !this.$store.inputIsEmpty && this.$app.optionVoter.canAdd()
    }
}