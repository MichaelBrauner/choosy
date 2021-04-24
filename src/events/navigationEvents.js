import {Widget} from "../components/Widget";
import Component from "../components/Component";

/**
 * @extends Component
 */
export default class NavigationEvents extends Component{

    constructor(app) {
        super(undefined, app);
    }

    handle(event) {
        if (event.key === 'ArrowDown') {
            event.preventDefault()
            this.arrowDownEvent(event)
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault()
            this.arrowUpEvent(event)
        }
    }

    arrowDownEvent(event) {
        if (this.isNavigationEnabled(event)) this.$navigation.down()
    }

    arrowUpEvent(event) {
        if (this.isNavigationEnabled(event)) this.$navigation.up()
    }

    isNavigationEnabled(event) {
        const widget = this.getWidgetFromEvent(event)
        return this.$app.widget.resultList.isOpen(widget) && !this.$app.widget.resultList.list.isEmpty(widget)
    }

    getWidgetFromEvent(event) {
        return event.target.closest(Widget.selector)
    }
}

