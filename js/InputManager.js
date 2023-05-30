
export default class InputManager {
	constructor(EventManager, WindowContext, CanvasContext, ObjectManager) {
		this._EventManager = EventManager;
		this._ObjectManager = ObjectManager;
		this._window = WindowContext;
		this._canvas = CanvasContext.canvas;
		this.mouse = {x: 0, y:0 };
		this._window.addEventListener('keydown', this.handleKeyDown.bind(this));
		this._canvas.addEventListener('click', this.handleClick.bind(this));
		this._canvas.addEventListener("mousemove", this.handleMouseMove.bind(this), false);
	}
	handleMouseMove(event) {
		const rect = this._canvas.getBoundingClientRect();
		this.mouse.x = event.clientX - rect.left;
		this.mouse.y = event.clientY - rect.top;
		const coordinates = this.getMousePosition();
		this._EventManager.dispatchEvent("moveCursor", coordinates)
	}

	getMousePosition() {
		return {
			x: this.mouse.x,
			y: this.mouse.y,
		}
	}

	handleKeyDown() {
		const coordinates = this.getMousePosition();
		this._EventManager.dispatchEvent('checkCollision', coordinates)

	}

	handleClick(event) {
		const coordinates = this.getMousePosition();
		this._EventManager.dispatchEvent('checkCollision', coordinates)
	}

}

