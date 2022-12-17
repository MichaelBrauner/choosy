import classnames from "../classnames";
import TagList from "../components/TagList";
import Component from "../components/Component";

export default class InputVoter extends Component{

    constructor(app) {
        super(app);
    }

    shouldFocusOnWidgetClick(event): boolean {
        if (event.target.classList.contains(classnames.result_list_item)) {
            return false
        }

        if (!this.$config.options.enabled)
            return false

        // if user clicked onto the Taglist (classnames.list) - especially when the list takes up all the space
        // or he clicked outside it (but inside the scope for triggering this voter)
        // then the list should open
        return event.target.classList.contains(classnames.list) || !event.target.closest(TagList.selector);
    }

}