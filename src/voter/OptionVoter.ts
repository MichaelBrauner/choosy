import Component from "../components/Component";

export default class OptionVoter extends Component{
    canAdd() {
        if (this.inputIsEmptyAndNothingIsSelected()) {
            return false
        }
        return !this.$app.store.options.allTaken
    }

    private inputIsEmptyAndNothingIsSelected() {
        return !this.$store.input?.length && this.$option.getModel().isBlanc() && this.$navigation.item.isBlanc();
    }
}