import Component from "./Component";
import {merge} from "../util";
import Choosy from "../choosy";

export default class Config extends Component {

    options = {
        enabled : true,
        limit: null,
        openOnFocus: true
    }

    constructor(app: Choosy, options) {
        super(app);

        if (options) {
            this.options = merge(this.options, options)
        }
    }

    resolveEnabled(): void {

        if (this.options.enabled)
            this.$widget.enable()

        if (!this.options.enabled)
            this.$widget.disable()

    }

}