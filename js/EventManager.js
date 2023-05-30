import { isIterable } from "./Utils.js"
class EventManager {
	constructor() {
		this.listeners = new Map()
	}
	// Register Event with Manager
	addEventListener(eventType, listener) {
		if (!this.listeners.has(eventType)) {
			this.listeners.set(eventType, new Set());
		}
		this.listeners.get(eventType).add(listener)
	}
	// Remove Event
	removeEventListener(eventType, listener) {
		if (this.listeners.has(eventType)) this.listeners.get(eventType).delete(listener)
	}

	// If EventListener exists, dispatch event
	dispatchEvent(eventType, data) {
		if (this.listeners.has(eventType)) {
			for (const listener of this.listeners.get(eventType)) {
				isIterable(data) ? listener(...data) : listener(data)
			}
		}
	}
}

const Instance = new EventManager();

export default Instance;

