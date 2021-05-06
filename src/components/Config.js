import Component from "./Component";
import {merge} from "../util";

export default class Config extends Component {

    constructor(app, options) {
        super(app);

        if (options) {
            this.options = merge(this.options, options)
        }

        // console.log(this.options)
    }

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