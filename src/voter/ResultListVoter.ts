import Component from "../components/Component";

export default class ResultListVoter extends Component{

    canOpenAll(): boolean {
        return this.$store.inputIsEmpty && !this.$app.store.options.allTaken
    }

    canOpen(): boolean {
        return !this.$store.inputIsEmpty && !this.$app.store.options.allTaken
    }
}