export default class Event {
    subscribers = {}

    on(eventName, callback) {
        if (!Array.isArray((this.subscribers)[eventName])) {
            (this.subscribers)[eventName] = []
        }
        (this.subscribers)[eventName].push(callback)
    }

    off(eventName, callback) {
        if (callback) {
            (this.subscribers)[eventName] = this.subscribers[eventName].filter(event => event !== callback)
            return
        }

        (this.subscribers)[eventName] = []
    }

    emit(eventName, data) {
        if (!Array.isArray(this.subscribers[eventName])) {
            return
        }
        (this.subscribers)[eventName].forEach((callback) => {
            callback(data)
        })
    }

}