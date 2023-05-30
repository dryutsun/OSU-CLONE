import EventManager from "./EventManager.js"
import InputManager from "./InputManager.js"

class Circles {
	constructor(color, x, y, radian) {
		this.color = color;
		this.x = x;
		this.y = y;
		this.radian = radian;
		this.start = 0;
		this.end = Math.PI * 2
		this.outer_radian = this.radian * 3;
		this.shrinking = true;
		this.shrinkAmount = .25;
		this.alive = true;
	}
	render(ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radian, this.start, this.end);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();

		ctx.beginPath();
		ctx.arc(this.x, this.y, this.outer_radian, this.start, this.end);
		ctx.stroke()

	}
	onTTLDeathEvent() {
		this.alive = false;
		EventManager.dispatchEvent('TTL', this)
	}
	update() {
		if (this.outer_radian > this.radian) {
			this.shrinking = true;
		}
		if (this.shrinking == true) {
			this.outer_radian -= this.shrinkAmount;
		}
		if (this.outer_radian <= this.radian) {
			this.shrinking = false;
			this.onTTLDeathEvent()
		}
	}
}

class Cursor {
	constructor(x, y, color, height, width) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.height = height;
		this.width = width;
	}
	render(ctx) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height)
	}
	getCoordinates(coordinates) {
		this.x = coordinates.x;
		this.y = coordinates.y;
	}
	update() {
	}
}

class Particle {
	constructor(x, y, radian, color, velocity, alpha) {
		this.x = x;
		this.y = y;
		this.radian = radian;
		this.velocity = velocity;
		this.alpha = alpha;
	}
	notify() {

	}
	render(ctx) {
		ctx.save()
		ctx.globalAlpha = this.alpha
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
		ctx.fillStyle = this.color
		ctx.fill()
		ctx.closePath()
		ctx.restore()
	}
}

class MenuItem {
	constructor(label, action, x, y, width, height) {
		this.label = label;
		this.action = action;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	render(ctx) {

	}
	onClick() {
		EventManager.dispatchEvent('MenuAction', action)
	}

}

export {
	Circles,
	Cursor,
	Particle
}
