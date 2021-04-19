import {Widget} from "./components/Widget";
import Event from "./event";
import Store from "./store";
import Config from "./components/Config";
import TagList from "./components/TagList";
import './style/choosy.css'
import '@symfony/stimulus-bridge'

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
        this.windowBlurEvent()
    }

    clickedOutsideOfWidgetEvent() {
        document.addEventListener('click', event => {

            if (this.widget.element.contains(event.target) || this.isClickOnTagList(event))
                return

            Event.emit('widget_clicked_outside')
        })
    }

    windowBlurEvent() {
        window.addEventListener('blur', () => {
            Event.emit('window_blur')
        })
    }

    isClickOnTagList(event) {
        return !!event.target.closest(TagList.selector);
    }

    initializeData() {
        Store.options.all = Array.from(Store.initialData)
    }

    resolveOptions() {
        if (!this.widget.initialElement.isMultiple)
            Config.textInput.limit = 1
    }
}