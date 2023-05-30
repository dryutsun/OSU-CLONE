import { isCursorInsideCircle } from "./Utils.js"
export default class CollisionManager {
	constructor(EventManager, ObjectManager) {
		this._EventManager = EventManager;
		this._ObjectManager = ObjectManager;
		this._EventManager.addEventListener("checkCollision", this.handleCheckCollision.bind(this));
	}

	handleCheckCollision(coordinates) {
		const Cursor = this._ObjectManager.getMainObject();
		const EntityStore = this._ObjectManager.getAllEntities();
		for (const Entity of EntityStore) {
			if (isCursorInsideCircle(coordinates, Entity)) {
				this._EventManager.dispatchEvent('collision', Entity)
			}
		}
	}



}
