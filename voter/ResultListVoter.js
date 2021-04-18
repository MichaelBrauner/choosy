import Store from "../store";
import OptionVoter from "./OptionVoter";

export default {

    canOpenAll() {
        return Store.inputIsEmpty && OptionVoter.canAdd()
    },

    canOpen() {
        return !Store.inputIsEmpty && OptionVoter.canAdd()
    }

}