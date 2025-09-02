export default class PubSub {
    constructor() {
        this.listeners = {};
    }
    on(event, listener) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(listener);
    }
    emit(event, payload) {
        const ev = this.listeners[event];
        if (ev && ev.length > 0) {
            for (const l of ev) {
                l(payload);
            }
        }
    }
}
//# sourceMappingURL=pubsub.js.map