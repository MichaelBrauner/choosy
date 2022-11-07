export default class AppEvent {

    private subscribers: Object = {};

    on(eventName: string, callback: Function): void {
        if (!Array.isArray((this.subscribers)[eventName])) {
            (this.subscribers)[eventName] = []
        }
        (this.subscribers)[eventName].push(callback)
    }

    off(eventName: string, callback: Function|undefined = undefined): void {
        if (callback) {
            (this.subscribers)[eventName] = this.subscribers[eventName].filter(event => event !== callback)
            return
        }

        (this.subscribers)[eventName] = []
    }

    emit(eventName: string, data: any = undefined): void {
        if (!Array.isArray(this.subscribers[eventName])) {
            return
        }
        (this.subscribers)[eventName].forEach((callback: Function) => {
            callback(data)
        })
    }

}