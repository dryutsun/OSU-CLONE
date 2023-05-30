import CollisionManager from "./CollisionManager.js"
import EventManager from "./EventManager.js"
import InputManager from "./InputManager.js"
import RenderManager from "./RenderManager.js"
import ObjectManager from "./ObjectManager.js"
import MenuManager from "./MenuManager.js"

export default class GameManager {
	constructor(globalWindow) {
		this.EventManager = EventManager
		this.RenderManager = new RenderManager(this.EventManager, 600, 600, "2d", globalWindow);
		this.ObjectManager = new ObjectManager(this.EventManager, this.RenderManager);
		this.CollisionManager = new CollisionManager(this.EventManager, this.ObjectManager);
		this.InputManager = new InputManager(this.EventManager, globalWindow, this.RenderManager, this.ObjectManager);
		this.MenuManager = new MenuManager(this.EventManager)
		this.isRunning = false;
	}
	initialize() {
		this.registerEventListeners();
		this.pauseGameLoop();
		this.EventManager.dispatchEvent("UIUpdate", "StartMenu")
	}

	StartGame() {
		if (this.isRunning) return;
		this.isRunning = true;
		this.ObjectManager.createTestObject(20)
		this.GameLoop();
	}
	registerEventListeners() {
		this.EventManager.addEventListener("StartGame", this.StartGame.bind(this))
	}
	stop() {
		this.isRunning = false;
	}
	pauseGameLoop() {
		cancelAnimationFrame(this.GameLoop.bind(this))

	}
	GameLoop() {
		if (!this.isRunning) return;
		this.update();
		this.render();
		requestAnimationFrame(this.GameLoop.bind(this));
	}
	update() {
		this.ObjectManager.updateAll();
	}
	render() {
		const entities = this.ObjectManager.getAllEntities();
		this.RenderManager.render(entities);
	}
	handleGameOver() {
		this.stop();
	}
}

