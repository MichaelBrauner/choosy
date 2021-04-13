import {Widget} from "./components/Widget";
import Event from "./event";
import Store from "./store";
import Config from "./components/Config";

export class Choosy {

    widget
    config

    constructor(element) {
        this.widget = new Widget(element)
        this.config = Config

        this.initializeData()
        this.registerEventListener()
        this.resolveOptions()
    }

    registerEventListener() {
        this.clickedOutsideOfWidgetEvent()
    }

    clickedOutsideOfWidgetEvent() {
        document.addEventListener('click', event => {
            if (this.widget.element.contains(event.target))
                return

            Event.emit('widget_clicked_outside')
        })
    }

    initializeData() {
        Store.options.all = Array.from(Store.initialData)
    }

    resolveOptions() {
        if(!this.widget.initialElement.isMultiple)
            Config.textInput.limit = 1
    }
}