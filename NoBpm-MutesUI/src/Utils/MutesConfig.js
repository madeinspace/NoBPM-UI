const MAXIMUM_EXPANDERS = 8;
const MAXIMUM_MODULES = 1 + MAXIMUM_EXPANDERS; // There has to be one Performer and 0..8 expanders
const MAXIMUM_SCENES = 4;
const MAXIMUM_BANKS = 8;

const MuteModules = Object.freeze({
	Performer: 0,
	Expander1: 1,
	Expander2: 2,
	Expander3: 3,
	Expander4: 4,
	Expander5: 5,
	Expander6: 6,
	Expander7: 7,
	Expander8: 8,
});

const LinkModes = Object.freeze({
	None: 0,
	Stereo: 1,
	Toggle: 2,
});

function createMutesManager() {
	const createEmptyMute = () => {
		return {
			"mutes": [false, false, false, false, false, false, false, false],
			"mode": [LinkModes.None, LinkModes.None, LinkModes.None, LinkModes.None, LinkModes.None, LinkModes.None, LinkModes.None, LinkModes.None]
		};
	}

	const createEmptyScene = () => {
		var scene = {
			"modules": []
		};
		for (let i = 0; i < MAXIMUM_MODULES; i++) {
			scene.modules.push(createEmptyMute());
		}
		return scene;
	}

	const createEmptyBank = () => {
		var bank = {
			"selected_scene": 0, // This is the scene that is loaded by default when the euro module powers on
			"scenes": []
		};
		for (let i = 0; i < MAXIMUM_SCENES; i++) {
			bank.scenes.push(createEmptyScene())
		}
		return bank;
	}

	const createEmptyMutesConfig = () => {
		var muteCfg = {
			"selected_bank": 0, // This is the bank thats loaded by default when the euro module powers on
			"num_expanders": 8,
			"banks": [],
			"colorTheme": {
				"id": 0xBAD0, "colors": {
					// These are all RGB values - i need to dig them out of the module code
					"functions": {
						"load_selected": [0x00, 0x00, 0x00],
						"load_unselected": [0x00, 0x00, 0x00],
						"clear_selected": [0x00, 0x00, 0x00],
						"clear_unselected": [0x00, 0x00, 0x00],
						"save_selected": [0x00, 0x00, 0x00],
						"save_unselected": [0x00, 0x00, 0x00],
						"hold_selected": [0x00, 0x00, 0x00],
						"hold_unselected": [0x00, 0x00, 0x00],
						"mute_selected": [0x00, 0x00, 0x00],
						"mute_unselected": [0x00, 0x00, 0x00],
						"cancel_selected": [0x00, 0x00, 0x00],
						"cancel_unselected": [0x00, 0x00, 0x00],
						"scene_selected": [0x00, 0x00, 0x00],
						"scene_unselected": [0x00, 0x00, 0x00],
						"scene_queued": [0x00, 0x00, 0x00],
						"scene_queued_modified": [0x00, 0x00, 0x00],
						"bank_selected": [0x00, 0x00, 0x00],
						"bank_unselected": [0x00, 0x00, 0x00],
						"bank_queued": [0x00, 0x00, 0x00],
						"bank_queued_modified": [0x00, 0x00, 0x00],
						"reset": [0x00, 0x00, 0x00],
						"copy": [0x00, 0x00, 0x00],
						"copy_source": [0x00, 0x00, 0x00],
						"copy_dest": [0x00, 0x00, 0x00],
						"off": [0x00, 0x00, 0x00],
					},
					"links": {
						"mono_l": [0x00, 0x00, 0x00],
						"mono_r": [0x00, 0x00, 0x00],
						"stereo_l": [0x00, 0x00, 0x00],
						"stereo_r": [0x00, 0x00, 0x00],
						"toggle_l": [0x00, 0x00, 0x00],
						"toggle_r": [0x00, 0x00, 0x00]
					}
				}
			},
			"midiMachines": { /*Colin needs to fill this in and work this crap out*/ }
		};

		for (let i = 0; i < MAXIMUM_BANKS; i++) {
			muteCfg.banks.push(createEmptyBank());
		}

		return muteCfg;
	}

	const toggleMuteStatus = (mutesConfig, muteModule, bankNum, sceneNum, muteChannel) => {
		mutesConfig.banks[bankNum].scenes[sceneNum].modules[muteModule].mutes[muteChannel] = !mutesConfig.banks[bankNum].scenes[sceneNum].modules[muteModule].mutes[muteChannel];
	}

	const setColorTheme = (mutesConfig, selectedTheme) => {
		mutesConfig.colorTheme.id = selectedTheme.id;
		mutesConfig.colorTheme.functions = selectedTheme.functions;
		mutesConfig.colorTheme.links = selectedTheme.links;
	}

	const loadFromMidi = (muteConfig, midiInputPort, midiOutputPort) => {
		// Colin writes this crap
	}

	const saveToMidi = (muteConfig, midiInputPort, midiOutputPort) => {
		// Colin writes this crap
	}

	// Return an array of all the possible color themes - the user can select one, then thats just blasted over the top inside the JSON mutes config object
	const getAllColorThemes = () => {
		return {
			"color_theme_list":
				[{
					"display_name": "Standard",
					"id": 0xBAD0, "colors": {
						"functions": {
							"load_selected": [0x00, 0x00, 0x00],
							"load_unselected": [0x00, 0x00, 0x00],
							"clear_selected": [0x00, 0x00, 0x00],
							"clear_unselected": [0x00, 0x00, 0x00],
							"save_selected": [0x00, 0x00, 0x00],
							"save_unselected": [0x00, 0x00, 0x00],
							"hold_selected": [0x00, 0x00, 0x00],
							"hold_unselected": [0x00, 0x00, 0x00],
							"mute_selected": [0x00, 0x00, 0x00],
							"mute_unselected": [0x00, 0x00, 0x00],
							"cancel_selected": [0x00, 0x00, 0x00],
							"cancel_unselected": [0x00, 0x00, 0x00],
							"scene_selected": [0x00, 0x00, 0x00],
							"scene_unselected": [0x00, 0x00, 0x00],
							"scene_queued": [0x00, 0x00, 0x00],
							"scene_queued_modified": [0x00, 0x00, 0x00],
							"bank_selected": [0x00, 0x00, 0x00],
							"bank_unselected": [0x00, 0x00, 0x00],
							"bank_queued": [0x00, 0x00, 0x00],
							"bank_queued_modified": [0x00, 0x00, 0x00],
							"reset": [0x00, 0x00, 0x00],
							"copy": [0x00, 0x00, 0x00],
							"copy_source": [0x00, 0x00, 0x00],
							"copy_dest": [0x00, 0x00, 0x00],
							"off": [0x00, 0x00, 0x00],
						},
						"links": {
							"mono_l": [0x00, 0x00, 0x00],
							"mono_r": [0x00, 0x00, 0x00],
							"stereo_l": [0x00, 0x00, 0x00],
							"stereo_r": [0x00, 0x00, 0x00],
							"toggle_l": [0x00, 0x00, 0x00],
							"toggle_r": [0x00, 0x00, 0x00]
						}
					}
				},
				{
					"display_name": "High Contrast",
					"id": 0xB33F, "colors": {
						"functions": {
							"load_selected": [0x00, 0x00, 0x00],
							"load_unselected": [0x00, 0x00, 0x00],
							"clear_selected": [0x00, 0x00, 0x00],
							"clear_unselected": [0x00, 0x00, 0x00],
							"save_selected": [0x00, 0x00, 0x00],
							"save_unselected": [0x00, 0x00, 0x00],
							"hold_selected": [0x00, 0x00, 0x00],
							"hold_unselected": [0x00, 0x00, 0x00],
							"mute_selected": [0x00, 0x00, 0x00],
							"mute_unselected": [0x00, 0x00, 0x00],
							"cancel_selected": [0x00, 0x00, 0x00],
							"cancel_unselected": [0x00, 0x00, 0x00],
							"scene_selected": [0x00, 0x00, 0x00],
							"scene_unselected": [0x00, 0x00, 0x00],
							"scene_queued": [0x00, 0x00, 0x00],
							"scene_queued_modified": [0x00, 0x00, 0x00],
							"bank_selected": [0x00, 0x00, 0x00],
							"bank_unselected": [0x00, 0x00, 0x00],
							"bank_queued": [0x00, 0x00, 0x00],
							"bank_queued_modified": [0x00, 0x00, 0x00],
							"reset": [0x00, 0x00, 0x00],
							"copy": [0x00, 0x00, 0x00],
							"copy_source": [0x00, 0x00, 0x00],
							"copy_dest": [0x00, 0x00, 0x00],
							"off": [0x00, 0x00, 0x00],
						},
						"links": {
							"mono_l": [0x00, 0x00, 0x00],
							"mono_r": [0x00, 0x00, 0x00],
							"stereo_l": [0x00, 0x00, 0x00],
							"stereo_r": [0x00, 0x00, 0x00],
							"toggle_l": [0x00, 0x00, 0x00],
							"toggle_r": [0x00, 0x00, 0x00]
						}
					}
				},
				{
					"display_name": "Some Funky Colors",
					"id": 0xDEAD, "colors": {
						"functions": {
							"load_selected": [0x00, 0x00, 0x00],
							"load_unselected": [0x00, 0x00, 0x00],
							"clear_selected": [0x00, 0x00, 0x00],
							"clear_unselected": [0x00, 0x00, 0x00],
							"save_selected": [0x00, 0x00, 0x00],
							"save_unselected": [0x00, 0x00, 0x00],
							"hold_selected": [0x00, 0x00, 0x00],
							"hold_unselected": [0x00, 0x00, 0x00],
							"mute_selected": [0x00, 0x00, 0x00],
							"mute_unselected": [0x00, 0x00, 0x00],
							"cancel_selected": [0x00, 0x00, 0x00],
							"cancel_unselected": [0x00, 0x00, 0x00],
							"scene_selected": [0x00, 0x00, 0x00],
							"scene_unselected": [0x00, 0x00, 0x00],
							"scene_queued": [0x00, 0x00, 0x00],
							"scene_queued_modified": [0x00, 0x00, 0x00],
							"bank_selected": [0x00, 0x00, 0x00],
							"bank_unselected": [0x00, 0x00, 0x00],
							"bank_queued": [0x00, 0x00, 0x00],
							"bank_queued_modified": [0x00, 0x00, 0x00],
							"reset": [0x00, 0x00, 0x00],
							"copy": [0x00, 0x00, 0x00],
							"copy_source": [0x00, 0x00, 0x00],
							"copy_dest": [0x00, 0x00, 0x00],
							"off": [0x00, 0x00, 0x00],
						},
						"links": {
							"mono_l": [0x00, 0x00, 0x00],
							"mono_r": [0x00, 0x00, 0x00],
							"stereo_l": [0x00, 0x00, 0x00],
							"stereo_r": [0x00, 0x00, 0x00],
							"toggle_l": [0x00, 0x00, 0x00],
							"toggle_r": [0x00, 0x00, 0x00]
						}
					}
				}
				]
		};
	}

	// Returns an array of all the supported midi machines, each one will have a display name, id number and the mappings
	const getAllMidiMachines = () => {
		return {
			"midiMachines": [
				{/*Colin needs to fill this in and work this crap out*/ },
				{/*Colin needs to fill this in and work this crap out*/ },
				{/*Colin needs to fill this in and work this crap out*/ },
				{/*Colin needs to fill this in and work this crap out*/ }
			]
		};
	}
	return {
		createEmptyMutesConfig,
		loadFromMidi,
		saveToMidi,
		getAllColorThemes,
		getAllMidiMachines,

		// These are just example functions and we can prolly nuke em
		setColorTheme,
		toggleMuteStatus,

	};
}

export default createMutesManager;
