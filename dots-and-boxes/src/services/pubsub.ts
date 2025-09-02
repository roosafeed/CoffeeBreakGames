export default class PubSub {
    private listeners: { [event: string]: Listener<any>[] } = {};

    public on<T>(event: string, listener: Listener<T>): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(listener);
    }

    public emit<T>(event: string, payload: T): void {
        const ev = this.listeners[event];
        if (ev && ev.length > 0) {
            for (const l of ev) {
                l(payload);
            }
        }
    }
}

type Listener<T> = (payload: T) => void;