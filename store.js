import Option from "./option";

const Store = {
    input: null,
    initialData: [],
    options: new Option(),

    get inputIsEmpty() {

        if(!this.input)
            return true

        return this.input?.length <= 0
    }
}

export default Store