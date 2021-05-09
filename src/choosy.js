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

    constructor(element, config) {

        this.store = new Store(this)
        this.event = new Event()
        this.widget = new Widget(element, this)
        this.config = new Config(this, config)
        this.navigation = new Navigation(this)

        this.resultListVoter = new ResultListVoter(this)
        this.optionVoter = new OptionVoter(this)
        this.inputVoter = new InputVoter(this)

        this.widget.initialElement.element.__x = this

        this.initializeData()
        this.registerEventListener()
        this.resolveOptions()
        this.widget.update(false)
    }

    registerEventListener() {
        document.addEventListener('click', this.clickedOutsideOfWidgetEvent)
        window.addEventListener('blur', this.windowBlurEvent)
    }

    removeEventListeners() {
        document.removeEventListener('click', this.clickedOutsideOfWidgetEvent)
        window.removeEventListener('blur', this.windowBlurEvent)
    }

    clickedOutsideOfWidgetEvent = (event) => {
        if (this.widget.element.contains(event.target) || this.isClickOnTagList(event))
            return

        this.event.emit('widget_clicked_outside')
    }

    windowBlurEvent = () => {
        this.event.emit('window_blur')
    }

    isClickOnTagList(event) {
        return !!event.target.closest(TagList.selector);
    }

    initializeData() {
        this.store.options.options = Array.from(this.store.initialData)
    }

    resolveOptions() {
        if (!this.widget.initialElement.isMultiple)
            this.config.options.limit = 1
    }

    disable() {
        this.config.options.enabled = false
        this.widget.disable()
    }

    enable() {
        this.config.options.enabled = true
        this.widget.enable()
    }

    clear() {
        this.widget.destroy()
        this.removeEventListeners()
        this.store = undefined
        this.event = undefined
        this.config = undefined
        this.navigation = undefined
        this.resultListVoter = undefined
        this.optionVoter = undefined
        this.inputVoter = undefined

        this.widget.initialElement.element.__x = undefined
    }
}