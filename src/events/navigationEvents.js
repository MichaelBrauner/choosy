import Navigation from "../components/Navigation";
import ResultList from "../components/ResultList";
import ResultListList from "../components/ResultListList";
import {Widget} from "../components/Widget";

export default {

    handle(event) {
        if (event.key === 'ArrowDown') {
            event.preventDefault()
            this.arrowDownEvent(event)
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault()
            this.arrowUpEvent(event)
        }
    },

    arrowDownEvent(event) {
        if (this.isNavigationEnabled(event)) Navigation.down()
    },

    arrowUpEvent(event) {
        if (this.isNavigationEnabled(event)) Navigation.up()
    },

    isNavigationEnabled(event) {
        const widget = this.getWidgetFromEvent(event)
        return ResultList.isOpen(widget) && !ResultListList.isEmpty(widget)
    },

    getWidgetFromEvent(event) {
        return event.target.closest(Widget.selector)
    }
}

