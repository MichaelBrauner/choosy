import Store from "./store";
import Config from "./components/Config";
import Navigation from "./components/Navigation";
import Widget from "./components/Widget";
import TagList from "./components/TagList";
import ResultListVoter from "./voter/ResultListVoter";
import OptionVoter from "./voter/OptionVoter";
import InputVoter from "./voter/InputVoter";
import AppEvent from "./event";

export default class Choosy {

    config: Config
    store: Store;
    navigation: Navigation;
    resultListVoter: ResultListVoter;
    event: AppEvent;
    optionVoter: OptionVoter;
    inputVoter: InputVoter;
    widget: Widget;

    constructor(element?: HTMLSelectElement, config?: any[]) {
        if (!element)
            return

        this.store = new Store(this)
        this.event = new AppEvent()
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

    isClickOnTagList(event: Event) {
        return !!(event.target as HTMLElement).closest(TagList.selector);
    }

    initializeData(): void {
        this.store.options.options = Array.from(this.store.initialData)
    }

    resolveOptions(): void {
        if (!this.widget.initialElement.isMultiple)
            this.config.options.limit = 1
    }

    disable(): void {
        this.config.options.enabled = false
        this.widget.disable()
    }

    enable(): void {
        this.config.options.enabled = true
        this.widget.enable()
    }

    clear(): void {
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