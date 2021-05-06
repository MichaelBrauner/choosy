import Component from "./Component";
import NavigationEvents from "../events/navigationEvents";

/**
 * @extends Component
 */
export default class Navigation extends Component{

    item = ''

    /**
     *
     * @param {Choosy} app
     */
    constructor(app) {
        super(app);

        this.events = new NavigationEvents(app)
    }

    up() {
        const results = this.$app.widget.resultList.list.results

        if (!this.selectedItem) {
            if (!this.$app.resultListVoter.canOpenAll()) {
                this.selectedItem = 'add'
            } else {
                this.selectedItem = results[results.length - 1]
            }
        } else {
            const index = results.indexOf(this.selectedItem)

            if (this.selectedItem === 'add') {
                this.selectedItem = results[results.length - 1]
            } else {

                if (index <= results.length - 1) {
                    this.selectedItem = results[index - 1]
                }

                if (!results[index - 1]) {
                    if (!this.$app.resultListVoter.canOpenAll()) {
                        this.selectedItem = 'add'
                    } else {
                        this.selectedItem = results[results.length - 1]
                    }
                }
            }

        }

        this.$event.emit('navigation_action', 'up')
    }

    down() {
        const results = this.$app.widget.resultList.list.results

        if (!this.selectedItem) {

            if (!results.length) {
                this.selectedItem = 'add'
            } else {
                this.selectedItem = results[0]
            }

        } else {

            if (this.selectedItem !== 'add') {
                const index = results.indexOf(this.selectedItem)

                if (results.length > index + 1) {
                    this.selectedItem = results[index + 1]
                }

                if (results.length === index + 1) {
                    if (!this.$app.resultListVoter.canOpenAll()) {
                        this.selectedItem = 'add'
                    } else {
                        this.selectedItem = results[0]
                    }
                }
            } else {
                this.selectedItem = results[0]
            }

        }


        this.$event.emit('navigation_action', 'down')
    }

    clear() {
        this.selectedItem = ''
    }

    isActive(option) {
        return option === this.selectedItem
    }

    isAddItem() {
        return 'add' === this.selectedItem
    }

    get selectedItem() {
        return this.item
    }

    set selectedItem(item) {
        this.item = item
    }

}