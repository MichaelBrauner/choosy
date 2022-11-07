import Widget from "../components/Widget";
import Component from "../components/Component";

export default class NavigationEvents extends Component {

    handle(event): void {
        if (event.key === 'ArrowDown') {
            event.preventDefault()
            this.arrowDownEvent(event)
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault()
            this.arrowUpEvent(event)
        }
    }

    arrowDownEvent(event): void {
        if (this.isNavigationEnabled(event)) this.$navigation.down()
    }

    arrowUpEvent(event): void {
        if (this.isNavigationEnabled(event)) this.$navigation.up()
    }

    isNavigationEnabled(event): boolean {
        const widget = this.getWidgetFromEvent(event)
        return this.$app.widget.resultList.isOpen(widget) && !this.$app.widget.resultList.list.isEmpty(widget)
    }

    getWidgetFromEvent(event: Event): HTMLSelectElement {
        return (event.target as Element).closest(Widget.selector)
    }
}

