const Event = {
    subscribers: {},

    on(eventName, callback) {
        if (!Array.isArray((this.subscribers)[eventName])) {
            (this.subscribers)[eventName] = []
        }
        (this.subscribers)[eventName].push(callback)
    },

    off(eventName, callback) {
        if (this.subscribers[eventName]){
            console.log('remove the event')
        }
    },

    emit(eventName, data) {
        if (!Array.isArray(this.subscribers[eventName])) {
            return
        }
        (this.subscribers)[eventName].forEach((callback) => {
            callback(data)
        })
    },

}

export default Event