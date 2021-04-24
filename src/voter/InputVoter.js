import classnames from "../classnames";
import TagList from "../components/TagList";

export default class InputVoter {

    constructor(app) {
        this.app = app
    }

    shouldFocusAfterEvent(event) {

        if (event.target.classList.contains(classnames.result_list_item))
            return false

        return !event.target.closest(TagList.selector);

    }

}