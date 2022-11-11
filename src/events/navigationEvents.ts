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

    arrowDownEvent(event: KeyboardEvent): void {
        this.isNavigationEnabled(event) && this.$navigation.down()
        this.$event.emit('navigation_action', 'down')
    }

    arrowUpEvent(event: KeyboardEvent): void {
        this.isNavigationEnabled(event) && this.$navigation.up()
        this.$event.emit('navigation_action', 'up')
    }

    isNavigationEnabled(event): boolean {
        const widget = this.getWidgetFromEvent(event)
        return this.$app.widget.resultList.isOpen(widget) && !this.$app.widget.resultList.list.isEmpty(widget)
    }

    getWidgetFromEvent(event: Event): HTMLDivElement {
        return (event.target as Element).closest(Widget.selector)
    }
}

