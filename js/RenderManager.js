export default class RenderManager {
	constructor(EventManager, width, height, dims = "2d", WindowContext) {
		this._EventManager = EventManager;
		this.canvas = document.getElementById("canvas");
		this.WindowContext = WindowContext;
		this.context = this.canvas.getContext(dims);
		this.context.canvas.startWidth = 0;
		this.context.canvas.startHeight = 0;
		this.context.canvas.width = width;
		this.context.canvas.height = height;
		this._EventManager.addEventListener("RenderUI", this.handleRenderUI.bind(this))
	}
	getDims() {
		return {
			startWidth: this.context.canvas.startWidth,
			startHeight: this.context.canvas.startHeight,
			width: this.context.canvas.width,
			height: this.context.canvas.height
		}
	}
	render(objects) {
		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
		// this.context.clearRect(this.last.x, this.last.y, this.last.width, this.last.height)
		for (const entity of objects) {
			this.renderObject(entity);
		}
	}
	handleRenderUI(menu) {
		if (menu === null) {
			this.clearMenu();
		} else {
			this.clearMenu();
			this.renderMenu(menu)
		}
	}
	clearMenu() {
		const list = document.getElementById("MenuOptions");
		while(list.firstChild) {
			list.removeChild(list.firstChild)
		}
	}
	addDomElement() { }

	renderMenu(menu) {
		const list = document.getElementById("MenuOptions");
		for (const item of menu.items) {
			let container = document.createElement("li")
			let text = document.createElement("p")
			text.innerHTML = item.label;
			container.addEventListener('click', () => {
				this._EventManager.dispatchEvent('MenuAction', item.action)
			})
			container.appendChild(text);
			list.appendChild(container);
		}
	}

	
	renderObject(entity) {
		if (entity.render !== undefined) {
			entity.render(this.context)
		}
	}
}


