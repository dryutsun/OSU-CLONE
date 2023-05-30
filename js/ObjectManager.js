import { Cursor, Circles } from "./Entities.js"
import { RandomSpawnInbounds } from "./Utils.js"

export default class ObjectManager {
	constructor(EventManager, RenderManager) {
		this._EventManager = EventManager;
		this._canvas = RenderManager;
		this.mainObject = new Cursor(0, 0, "red", 50, 50)
		this.EntityStore = [];
		this.ParticleStore = [];
		this._EventManager.addEventListener("collision", this.removeEntity.bind(this));
		this._EventManager.addEventListener("TTL", this.removeEntity.bind(this))
	}
	createTestObject(amount) {
		let dims = this._canvas.getDims();
		let i = 0;
		let spawntick = setInterval(() => {
			let x = RandomSpawnInbounds(dims.startWidth + 20, dims.width - 20)
			let y = RandomSpawnInbounds(dims.startHeight + 20, dims.height - 20)
			this.EntityStore.push(new Circles("green", x, y, 20,))
			++i;
			console.log(i, amount)
			if (i == amount) clearInterval(spawntick)

		}, 500)

	}

	setMainObject(object) {
		this.mainObject = object;
	}
	getMainObject() {
		return this.mainObject;
	}
	getAllEntities() {
		return this.EntityStore;
	}

	addEntities(object) {
		this.EntityStore.push(object);
	}
	removeEntity(object) {
		const index = this.EntityStore.indexOf(object);
		if (index !== -1) {
			this.EntityStore.splice(index, 1);
		}
	}
	updateAll() {

		this.updateCursor();
		this.updateEntities();
		this.updateParticles();
	}
	updateParticles() {
		for (const particle of this.ParticleStore) {
			particle.update();
		}
	}
	updateCursor() {
		this.mainObject.update();
	}
	updateEntities() {
		for (const Entity of this.EntityStore) {
			Entity.update();
		}
	}
}
