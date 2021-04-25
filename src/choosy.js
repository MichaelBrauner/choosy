import {Widget} from "./components/Widget";
import Event from "./event";
import TagList from "./components/TagList";
import './style/choosy.css'
import Config from "./components/Config";
import Store from "./store";
import Navigation from "./components/Navigation";
import ResultListVoter from "./voter/ResultListVoter";
import OptionVoter from "./voter/OptionVoter";
import InputVoter from "./voter/InputVoter";

export default class Choosy {

    widget
    config

    constructor(element) {

        this.store = new Store(this)
        this.event = new Event()
        this.widget = new Widget(element, this)
        this.config = new Config()
        this.navigation = new Navigation(this)

        this.resultListVoter = new ResultListVoter(this)
        this.optionVoter = new OptionVoter(this)
        this.inputVoter = new InputVoter(this)

        this.widget.element.__x = this

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

            this.event.emit('widget_clicked_outside')
        })
    }

    windowBlurEvent() {
        window.addEventListener('blur', () => {
            this.event.emit('window_blur')
        })
    }

    isClickOnTagList(event) {
        return !!event.target.closest(TagList.selector);
    }

    initializeData() {
        this.store.options.options = Array.from(this.store.initialData)
    }

    resolveOptions() {
        if (!this.widget.initialElement.isMultiple)
            this.config.textInput.limit = 1
    }
}