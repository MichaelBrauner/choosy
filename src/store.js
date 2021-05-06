import Option from "./option";
import Component from "./components/Component";

export default class Store extends Component{

    constructor(app) {
        super(app);
    }

    input = null

    initialData = []

    options = new Option(this.$app)

    get inputIsEmpty() {

        if (!this.input)
            return true

        return this.input?.length <= 0
    }
}