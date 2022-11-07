import Component from "./Component";
import NavigationEvents from "../events/navigationEvents";
import OptionModel from "../model/OptionModel";
import Choosy from "../choosy";

export default class Navigation extends Component {

    item: OptionModel = new OptionModel()
    events: NavigationEvents;

    constructor(app: Choosy) {
        super(app);
        this.events = new NavigationEvents(app)
    }

    up() {

        const results = this.$app.widget.resultList.list.results

        if (this.selectedItem.isBlanc()) {

            if (!this.$app.resultListVoter.canOpenAll()) {
                this.switchToAdd();
            } else {
                this.selectedItem = results[results.length - 1]
            }

        } else {

            const index = results.indexOf(this.selectedItem)

            if (this.selectedItem.isAddition()) {
                this.selectedItem = results[results.length - 1]
            } else {

                if (index <= results.length - 1) {
                    this.selectedItem = results[index - 1]
                }

                if (!results[index - 1]) {

                    if (!this.$app.resultListVoter.canOpenAll()) {
                        this.switchToAdd()
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
                this.selectedItem = OptionModel.Addition
            } else {
                this.selectedItem = results[0]
            }

        } else {

            if (this.selectedItem.isAddition()) {
                const index = results.indexOf(this.selectedItem)

                if (results.length > index + 1) {
                    this.selectedItem = results[index + 1]
                }

                if (results.length === index + 1) {
                    if (!this.$app.resultListVoter.canOpenAll()) {
                        this.selectedItem = OptionModel.Addition
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

    clear(): void {
        this.selectedItem = new OptionModel()
    }

    isActive(option: OptionModel): boolean {
        return option === this.selectedItem
    }

    get selectedItem(): OptionModel {
        return this.item
    }

    set selectedItem(item: OptionModel) {
        this.item = item
    }

    private switchToAdd(): void {
        this.selectedItem = OptionModel.Addition
    }
}