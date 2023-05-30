export default class MenuManager {
	constructor(EventManager) {
		this._EventManager = EventManager;
		this.MenuState = {
			ActiveScreen: 'StartMenu',
			items: [
					{ label: 'New Game', action: "StartGame" },
					{ label: 'Options', action: "ShowOptions" },
			]
		},
		this._EventManager.addEventListener('UIUpdate', this.handleUIUpdate.bind(this));
		this._EventManager.addEventListener('MenuAction', this.handleMenuAction.bind(this));
		this._EventManager.addEventListener('ClearMenu', this.clearMenu.bind(this));
	}
	handleUIUpdate(menuName) {
		this.MenuState.ActiveScreen = menuName;
		const data = this.getActiveMenuData()
		this._EventManager.dispatchEvent('RenderUI', data)
	}
	handleMenuAction(action) {
		this.updateMenuState(action)
		this._EventManager.dispatchEvent('UIUpdate', this.MenuState.ActiveScreen);
		if (action == 'StartGame') {
			this._EventManager.dispatchEvent('StartGame')
		}
	}
	updateMenuState(item, value) {
		this.MenuState.ActiveScreen = item;

	}
	clearMenu() {
		this.MenuState = {
			ActiveScreen: null,
			items: [],
		};
		this._EventManager.dispatchEvent('RenderUI', null);
	}

	getActiveMenuData() {
		let MenuData = null;
		if (this.MenuState.ActiveScreen == "StartMenu") {
			MenuData = {
				ActiveScreen: "StartMenu",
				items: [
					{ label: 'New Game', action: "StartGame" },
					{ label: 'Options', action: "OptionsMenu" },
				]
			}
		}
		else if (this.MenuState.ActiveScreen == "OptionsMenu") {
			MenuData = {
				ActiveScreen: "OptionsMenu",
				items: [
					{ label: 'Volume', action: "SetVolume" },
					{ label: 'Difficulty', action: "SetDifficulty" },
					{ label: 'Back', action: "StartMenu" },
				]
			}
		}
		return MenuData;
	}

}
