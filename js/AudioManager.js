export default class AudioManager {
	constructor() {
		this.AudioStore = new Map();
	}
	load(audioName, path) {
		const audio = new Audio(path);
		this.AudioStore.set(audioName, audio);
	}
	play(audioName) {
		if (this.AudioStore.has(audioName)) {
			const audio = this.AudioStore.get(audioName);
			audio.play();
		}
	}
}
