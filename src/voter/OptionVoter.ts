import Component from "../components/Component";

export default class OptionVoter extends Component{
    canAdd() {
        return !this.$app.store.options.allTaken
    }
}