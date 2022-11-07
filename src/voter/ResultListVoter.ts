import Component from "../components/Component";

export default class ResultListVoter extends Component{

    canOpenAll(): boolean {
        return this.$store.inputIsEmpty && this.$app.optionVoter.canAdd()
    }

    canOpen(): boolean {
        return !this.$store.inputIsEmpty && this.$app.optionVoter.canAdd()
    }
}