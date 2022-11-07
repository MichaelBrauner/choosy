export default class OptionModel {

    value: string | undefined;
    content: string | undefined;
    selected: boolean | undefined;
    timestamp: number | undefined;

    constructor(
        value: string | undefined = undefined,
        content: string | undefined = undefined,
        selected: boolean | undefined = undefined,
        timestamp: number | undefined = undefined
    ) {
        this.value = value;
        this.content = content;
        this.selected = selected;
        this.timestamp = timestamp;

        this.selected === undefined && (this.selected = this.decide())
        this.timestamp === undefined && (this.timestamp = this.decide() ? Date.now() : null)
    }

    static get Addition() {
        return new OptionModel('add')
    }

    isAddition(): boolean {
        return this.value === 'add' && this.isStateIndicator()
    }

    isBlanc(): boolean {
        return this.value === undefined && this.isStateIndicator()
    }

    private isStateIndicator(): boolean {
        return this.content === undefined
            && this.selected === undefined
            && this.timestamp === undefined
    }

    decide(): boolean {

        if (!this.value && !this.content)
            return false

        return this.selected
    }
}