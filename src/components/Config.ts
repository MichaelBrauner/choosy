import Component from "./Component";
import {merge} from "../util";
import Choosy from "../choosy";

export default class Config extends Component {

    /**
     * @param {Choosy} app
     * @param options
     */
    constructor(app: Choosy, options) {
        super(app, undefined);

        if (options) {
            this.options = merge(this.options, options)
        }
    }

    /**
     * @type {{openOnFocus: boolean, limit: null|number, enabled: boolean}}
     * @default
     */
    options = {
        enabled: true,
        limit: null,
        openOnFocus: true
    }

    resolveEnabled() {

        if (this.options.enabled)
            this.$widget.enable()

        if (!this.options.enabled)
            this.$widget.disable()

    }

}