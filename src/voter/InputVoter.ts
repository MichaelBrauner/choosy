import classnames from "../classnames";
import TagList from "../components/TagList";
import Component from "../components/Component";

export default class InputVoter extends Component{

    constructor(app) {
        super(app);
    }

    shouldFocusOnWidgetClick(event) {

        if (event.target.classList.contains(classnames.result_list_item))
            return false

        if (!this.$config.options.enabled)
            return false

        return !event.target.closest(TagList.selector);

    }

}