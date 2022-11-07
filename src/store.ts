import Option from "./option";
import Component from "./components/Component";
import Choosy from "./choosy";
import OptionModel from "./model/OptionModel";

export default class Store extends Component{

    constructor(app: Choosy) {
        super(app);
    }

    input: string|null = null
    initialData: OptionModel[] = []
    options: Option = new Option(this.$app)

    get inputIsEmpty() {
        if (!this.input)
            return true

        return this.input?.length <= 0
    }
}