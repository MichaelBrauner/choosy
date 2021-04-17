import Store from "../store";
import OptionVoter from "./OptionVoter";

export default {

    canOpen() {
        return Store.inputIsEmpty && OptionVoter.canAdd()
    }

}