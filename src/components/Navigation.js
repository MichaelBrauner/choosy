import ResultListList from "./ResultListList";
import Event from "../event";
import ResultListVoter from "../voter/ResultListVoter";

export default {

    item: '',

    up() {
        const results = ResultListList.results

        if (!this.selectedItem) {
            if (!ResultListVoter.canOpenAll()) {
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
                    if (!ResultListVoter.canOpenAll()) {
                        this.selectedItem = 'add'
                    } else {
                        this.selectedItem = results[results.length - 1]
                    }
                }
            }

        }

        Event.emit('navigation_action', 'up')
    },

    down() {
        const results = ResultListList.results

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
                    if (!ResultListVoter.canOpenAll()) {
                        this.selectedItem = 'add'
                    } else {
                        this.selectedItem = results[0]
                    }
                }
            } else {
                this.selectedItem = results[0]
            }

        }


        Event.emit('navigation_action', 'down')
    },

    clear() {
        this.selectedItem = ''
    },

    isActive(option) {
        return option === this.selectedItem
    },

    isAddItem() {
        return 'add' === this.selectedItem
    },

    get selectedItem() {
        return this.item
    },

    set selectedItem(item) {
        this.item = item
    }

}