import Choosy from "../choosy";
import Store from "../store";
import Navigation from "./Navigation";
import Event from "../event";
import Option from "../option";
import Config from "./Config";
import Widget from "./Widget";
import TextInput from "./TextInput";

export default class Component {

    protected $app: Choosy;
    element: HTMLElement;

    constructor(app: Choosy, element?: HTMLElement) {
        this.$app = app
        this.element = element
    }

    get $store(): Store {
        return this.$app.store
    }

    get $navigation(): Navigation {
        return this.$app.navigation
    }

    get $event(): Event {
        return this.$app.event
    }

    get $option(): Option {
        return this.$app.store.options
    }

    get $textInput(): TextInput {
        return this.$app.widget.tagList.textInput
    }

    get $widget(): Widget {
        return this.$app.widget
    }

    get $config(): Config {
        return this.$app.config
    }
}