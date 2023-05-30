import GameManager from "./GameManager.js"




// Wait for the DOM to be ready before we set the context.
document.addEventListener("DOMContentLoaded", (event) => {
	const Game = new GameManager(window)
	Game.initialize()
	
})

