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

    up(): void {

        if (!this.isStart()) {
            this.move('up')
            return
        }

        if (!this.$app.resultListVoter.canOpenAll() && !this.selectedItem.isAddition()) {
            this.switchToAdd()
            return
        }

        this.move('toEnd')

    }

    down(): void {

        if (!this.isStart(true)) {
            if (this.isNotLast()) {
                this.move('down')
                return
            }

            if (this.selectedItem.isAddition()) {
                this.move('toFirst')
                return
            }

            if (this.hasNoValidResults()) {
                this.switchToAdd()
                return
            }
        }

        if (!this.$app.resultListVoter.canOpenAll() && this.isLast()) {
            this.selectedItem = OptionModel.Addition
            return
        }

        this.move('toFirst')
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

    private move(direction: string = 'down'): void {
        const results = this.freeResults

        if (direction === 'down')
            this.selectedItem = results[results.indexOf(this.selectedItem) + 1]

        if (direction === 'up')
            this.selectedItem = results[results.indexOf(this.selectedItem) - 1]

        if (direction === 'toFirst')
            this.selectedItem = results[0]

        if (direction === 'toEnd')
            this.selectedItem = results[results.length - 1]

    }

    private get freeResults(): OptionModel[] | any[] {
        return this.$app.widget.resultList.list.noneSelectedResults;
    }

    private isStart(absolute = false): boolean {
        return absolute
            ? this.selectedItem.isBlanc()
            : this.selectedItem.isBlanc() || this.selectedItem.isFirstOf(this.freeResults) || this.selectedItem.isAddition()
    }

    private isNotLast(): boolean {
        return this.freeResults.length > this.freeResults.indexOf(this.selectedItem) + 1;
    }

    private isLast(): boolean {
        return !this.isNotLast();
    }

    private hasNoValidResults(): boolean {
        return !this.freeResults.length;
    }
}