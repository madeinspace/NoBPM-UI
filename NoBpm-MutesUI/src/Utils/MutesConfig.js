const MAXIMUM_EXPANDERS = 8;
const MAXIMUM_MODULES = 1 + MAXIMUM_EXPANDERS; // There has to be one Performer and 0..8 expanders
const MAXIMUM_SCENES = 4;
const MAXIMUM_BANKS = 8;
const DEFAULT_COLOR_THEME = 0;
const DEFAULT_MIDI_CHANNEL = 9;
const MAX_MIDI_CHANNELS = 16;

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

const Destinations = Object.freeze({
	MuteChannels: 0,
	Scenes: 1,
	Banks: 2,
});

const DefaultMachineID = Object.freeze({
	MidiProgramChangeID: 0xAC01,
	MidiBankChangeID: 0xAB01,
	GMMidiMute: 0xAA51,
});

const TargetSettingIDs = Object.freeze({
	MidiChannel : 0x1A,
	ProgramNumber: 0xDA,
	ToggleOnLevel: 0x3A,
	ToggleOffLevel: 0x35,
	ContinuousConrollerChange: 0x44,
	ContinuousControlerValue : 0x65,
	ContinuousControlerNumber : 0x66,
});

function createMutesManager() {

	const setMachineTargetSettingByID = (machine, targetIndex, sid, value) => {
		for (var s = 0; s < machine.targets[targetIndex].settings.length; s++) {
			if (machine.targets[targetIndex].settings[s].id == sid) {
				machine.targets[targetIndex].settings[s].value = value;
				break;
			}
		}
	}

	const setTargetLocation = (machine, targetIndex, module, dest, index) => {
		if (module != MuteModules.Performer) {
			if (dest != Destinations.MuteChannels) {
				throw new Error("Expander modules only have mute channels! (no scenes or banks)");
			}
		}
		machine.targets[targetIndex].location.module = module;
		machine.targets[targetIndex].location.dest = dest;
		machine.targets[targetIndex].location.index = index;
	}


	// Returns an array of all the supported midi machines, each one will have a display name, id number and the mappings
	const getAllMidiMachines = () => {
		return {
			"midiMachines": [

				{
					display_name: "General MIDI Program Change",
					id: DefaultMachineID.MidiProgramChangeID,
					settings: [],
					targets: [
						{
							display_name: "General MIDI Program Change",
							default_dest: Destinations.Scenes,
							location: {
								module: MuteModules.Performer,
								index: 0,
								dest: Destinations.Scenes,
							},
							type: "midi_progc",
							settings: [
								{
									id: TargetSettingIDs.MidiChannel,
									display_name: "MIDI Channel",
									value: 1,
									min: 1,
									max: 16
								},
								{
									id: TargetSettingIDs.ProgramNumber,
									display_name: "Program Number",
									value: 0,
									min: 0,
									max: 127
								}
							]
						},
					]
				},
				{
					display_name: "General MIDI Bank Select (MIDI CC 0 - Bank Select)",
					id: DefaultMachineID.MidiBankChangeID,
					settings: [],
					targets: [
						{
							display_name: "General MIDI Bank Select (MIDI CC 0 - Bank Select)",
							default_dest: Destinations.Banks,
							location: {
								module: MuteModules.Performer,
								index: 0,
								dest: Destinations.Banks,
							},
							type: "midi_cc",
							settings: [
								{
									id: TargetSettingIDs.MidiChannel,
									display_name: "MIDI Channel",
									value: 1,
									min: 1,
									max: 16
								},
								{
									id: TargetSettingIDs.ContinuousControlerNumber,
									display_name: "CC Number",
									value: 0,
									cannot_edit: true
								},
								{
									id: TargetSettingIDs.ContinuousControlerValue,
									display_name: "Bank Number",
									value: 0,
									min: 0,
									max: 127
								}
							]
						},
					]
				},

				{
					display_name: "MIDI CC Change",
					id: DefaultMachineID.ContinuousConrollerChange,
					settings: [],
					type: "midi_cc",
					targets: [
						{
							display_name: "MIDI CC Change",
							default_dest: Destinations.Banks,
							location: {
								module: MuteModules.Performer,
								index: 0,
								dest: Destinations.Banks,
							},
							type: "midi_cc",
							settings: [
								{
									id: TargetSettingIDs.MidiChannel,
									display_name: "MIDI Channel",
									value: 1,
									min: 1,
									max: 16
								},
								{
									id: TargetSettingIDs.ContinuousControlerNumber,
									display_name: "CC Number",
									value: 32,
									min: 0,
									max: 127
								},
								{
									id: TargetSettingIDs.ContinuousControlerValue,
									display_name: "CC Value",
									value: 0,
									min: 0,
									max: 127
								}
							]

						}
					]

				},

				{
					display_name: "General MIDI Mute (MIDI CC 7 - Volume)",
					id: DefaultMachineID.GMMidiMute,
					settings: [],
					targets: [
						{
							display_name: "MIDI Channel 1",
							location: {
								module: MuteModules.Performer,
								index: 0,
								dest: Destinations.MuteChannels,
							},
							default_dest: Destinations.MuteChannels,
							type: "midi_cc_toggle",
							cc_num: 7,
							settings: [
								{
									id: TargetSettingIDs.MidiChannel,
									display_name: "MIDI Channel",
									value: 1,
									min: 1,
									max: 16
								},
								{
									id: TargetSettingIDs.ToggleOnLevel,
									display_name: "Un-muted Volume Level",
									value: 127,
									min: 0,
									max: 127
								},
								{
									id: TargetSettingIDs.ToggleOffLevel,
									display_name: "Muted Volume Level",
									value: 0,
									min: 0,
									max: 127
								}
							]
						},


					]
				}


			]
		};
	}

	const all_midi_machines = getAllMidiMachines();

	const getMidiMachineByID = (machine_id) => {
		for (var mach = 0; mach < all_midi_machines.midiMachines.length; mach++) {
			if (all_midi_machines.midiMachines[mach].id == machine_id) {
				return structuredClone(all_midi_machines.midiMachines[mach]);
			}
		}
		throw new Error("getMidiMachineByID - Unknown Machine ID " + machine_id.toString());
	}


	// Return an array of all the possible color themes - the user can select one, then thats just blasted over the top inside the JSON mutes config object
	const getAllColorThemes = () => {

		const RGB_BLACK = [0,0,0];
		const RGB_RED   = [0xFF, 0x00, 0x00];
		const RGB_GREEN = [0x00, 0xFF, 0x00];
		const RGB_BLUE  = [0x00, 0x00, 0xFF];
		const RGB_YELLOW= [0xFF, 0xFF, 0x00];
		const RGB_ORANGE= [0xFF, 0x55, 0x05];
		const RGB_PURPLE= [0xFF, 0x00, 0xFF];
		const RGB_WHITE = [0xFF, 0xFF, 0xFF];
		const RGB_CYAN  = [0x00, 0xDD, 0xFF];
		const RGB_PINK  = [0xFF, 0x90, 0xAB];

		const DIM = (col) => {
			const dim_faktor = 6;
			return [Math.round(col[0] / dim_faktor), Math.round(col[1] / dim_faktor), Math.round(col[2] / dim_faktor)];
		}
		const MID = (col) => {
			const mid_faktor = 3;
			return [Math.round(col[0] / mid_faktor), Math.round(col[1] / mid_faktor), Math.round(col[2] / mid_faktor)];
		}

		return {
			color_theme_list:
				[{
					display_name: "Standard",
					id: 0xBAD0,
					colors: {
						runtime: {
							mute_selected: RGB_RED,
							mute_queued: RGB_ORANGE,
							mute_unselected: DIM(RGB_WHITE),
							mute_unselected_queued: MID(RGB_GREEN),
							scene_selected: RGB_CYAN,
							scene_unselected: DIM(RGB_CYAN),
							scene_queued: RGB_WHITE,
							bank_selected: RGB_YELLOW,
							bank_unselected: DIM(RGB_YELLOW),
							bank_queued: RGB_WHITE,
						},
						functions: {
							mute_selected: RGB_GREEN,
							mute_unselected: DIM(RGB_GREEN),
							load_selected: RGB_ORANGE,
							load_unselected: DIM(RGB_ORANGE),
							clear_selected: RGB_RED,
							clear_unselected: DIM(RGB_RED),
							save_selected: RGB_PURPLE,
							save_unselected: DIM(RGB_PURPLE),
							hold_selected: RGB_BLUE,
							hold_unselected: DIM(RGB_BLUE),
							bank_selected: RGB_YELLOW,
							bank_unselected: DIM(RGB_YELLOW),
							cancel_selected: RGB_WHITE,
							cancel_unselected: DIM(RGB_WHITE),
							reset: RGB_WHITE,
							copy: RGB_ORANGE,
							copy_source: RGB_ORANGE,
							copy_dest: RGB_PURPLE,
							off: [0x00, 0x00, 0x00],
						},
						links: {
							mono_l: DIM(RGB_WHITE),
							mono_r: DIM(RGB_WHITE),
							stereo_l: DIM(RGB_WHITE),
							stereo_r: DIM(RGB_RED),
							toggle_l: DIM(RGB_GREEN),
							toggle_r: DIM(RGB_GREEN),
						},
						midi: {
							config_selected: RGB_BLUE,
							config_unselected: DIM(RGB_BLUE),
							config_sel1: RGB_BLUE,
							config_sel2: RGB_RED,
							config_sel3: RGB_GREEN,

							exit_selected: RGB_WHITE,
							exit_unselected: DIM(RGB_WHITE),
							invert_selected: RGB_ORANGE,
							invert_unselected: DIM(RGB_ORANGE),
							unlink_selected: RGB_GREEN,
							unlink_unselected: DIM(RGB_GREEN),
						}
					}
				},
				{
					"display_name": "High Contrast",
					"id": 0xB33F,
					colors: {
						runtime: {
							mute_selected: RGB_RED,
							mute_queued: RGB_ORANGE,
							mute_unselected: DIM(RGB_WHITE),
							mute_unselected_queued: MID(RGB_GREEN),
							scene_selected: RGB_CYAN,
							scene_unselected: DIM(RGB_CYAN),
							scene_queued: RGB_WHITE,
							bank_selected: RGB_YELLOW,
							bank_unselected: DIM(RGB_YELLOW),
							bank_queued: RGB_WHITE,
						},
						functions: {
							mute_selected: RGB_GREEN,
							mute_unselected: DIM(RGB_GREEN),
							load_selected: RGB_ORANGE,
							load_unselected: DIM(RGB_ORANGE),
							clear_selected: RGB_RED,
							clear_unselected: DIM(RGB_RED),
							save_selected: RGB_PURPLE,
							save_unselected: DIM(RGB_PURPLE),
							hold_selected: RGB_BLUE,
							hold_unselected: DIM(RGB_BLUE),
							bank_selected: RGB_YELLOW,
							bank_unselected: DIM(RGB_YELLOW),
							cancel_selected: RGB_WHITE,
							cancel_unselected: DIM(RGB_WHITE),
							reset: RGB_WHITE,
							copy: RGB_ORANGE,
							copy_source: RGB_ORANGE,
							copy_dest: RGB_PURPLE,
							off: [0x00, 0x00, 0x00],
						},
						links: {
							mono_l: DIM(RGB_WHITE),
							mono_r: DIM(RGB_WHITE),
							stereo_l: DIM(RGB_WHITE),
							stereo_r: DIM(RGB_RED),
							toggle_l: DIM(RGB_GREEN),
							toggle_r: DIM(RGB_GREEN),
						},
						midi: {
							config_selected: RGB_BLUE,
							config_unselected: DIM(RGB_BLUE),
							config_sel1: RGB_BLUE,
							config_sel2: RGB_RED,
							config_sel3: RGB_GREEN,

							exit_selected: RGB_WHITE,
							exit_unselected: DIM(RGB_WHITE),
							invert_selected: RGB_ORANGE,
							invert_unselected: DIM(RGB_ORANGE),
							unlink_selected: RGB_GREEN,
							unlink_unselected: DIM(RGB_GREEN),
						}
					}
				},
				{
					"display_name": "Some Funky Colors",
					"id": 0xDEAD,
					colors: {
						runtime: {
							mute_selected: RGB_RED,
							mute_queued: RGB_ORANGE,
							mute_unselected: DIM(RGB_WHITE),
							mute_unselected_queued: MID(RGB_GREEN),
							scene_selected: RGB_CYAN,
							scene_unselected: DIM(RGB_CYAN),
							scene_queued: RGB_WHITE,
							bank_selected: RGB_YELLOW,
							bank_unselected: DIM(RGB_YELLOW),
							bank_queued: RGB_WHITE,
						},
						functions: {
							mute_selected: RGB_GREEN,
							mute_unselected: DIM(RGB_GREEN),
							load_selected: RGB_ORANGE,
							load_unselected: DIM(RGB_ORANGE),
							clear_selected: RGB_RED,
							clear_unselected: DIM(RGB_RED),
							save_selected: RGB_PURPLE,
							save_unselected: DIM(RGB_PURPLE),
							hold_selected: RGB_BLUE,
							hold_unselected: DIM(RGB_BLUE),
							bank_selected: RGB_YELLOW,
							bank_unselected: DIM(RGB_YELLOW),
							cancel_selected: RGB_WHITE,
							cancel_unselected: DIM(RGB_WHITE),
							reset: RGB_WHITE,
							copy: RGB_ORANGE,
							copy_source: RGB_ORANGE,
							copy_dest: RGB_PURPLE,
							off: [0x00, 0x00, 0x00],
						},
						links: {
							mono_l: DIM(RGB_WHITE),
							mono_r: DIM(RGB_WHITE),
							stereo_l: DIM(RGB_WHITE),
							stereo_r: DIM(RGB_RED),
							toggle_l: DIM(RGB_GREEN),
							toggle_r: DIM(RGB_GREEN),
						},
						midi: {
							config_selected: RGB_BLUE,
							config_unselected: DIM(RGB_BLUE),
							config_sel1: RGB_BLUE,
							config_sel2: RGB_RED,
							config_sel3: RGB_GREEN,

							exit_selected: RGB_WHITE,
							exit_unselected: DIM(RGB_WHITE),
							invert_selected: RGB_ORANGE,
							invert_unselected: DIM(RGB_ORANGE),
							unlink_selected: RGB_GREEN,
							unlink_unselected: DIM(RGB_GREEN),
						}
					}
				}
				]
		};
	}

	const setColorTheme = (mutesConfig, selectedTheme) => {
		const sT = structuredClone(selectedTheme);
		mutesConfig.colorTheme.id = sT.id;
		mutesConfig.colorTheme.colors.functions = sT.colors.functions;
		mutesConfig.colorTheme.colors.links = sT.colors.links;
		mutesConfig.colorTheme.colors.runtime = sT.colors.runtime;
		mutesConfig.colorTheme.colors.midi = sT.colors.midi;
	}

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
			"schema_version" : 101,
			"selected_bank": 0, // This is the bank thats loaded by default when the euro module powers on
			"num_expanders": MAXIMUM_EXPANDERS,
			"banks": [],
			"colorTheme": {
				colors: { functions: {}, links: {} }
			},
			"midiMachines": [],
		};

		for (let i = 0; i < MAXIMUM_BANKS; i++) {
			muteCfg.banks.push(createEmptyBank());
		}

		setColorTheme(muteCfg, getAllColorThemes().color_theme_list[DEFAULT_COLOR_THEME]);

		for (var pc = 0; pc < MAXIMUM_SCENES; pc++) {
			var prog_change = getMidiMachineByID(DefaultMachineID.MidiProgramChangeID);

			setMachineTargetSettingByID(prog_change, 0, TargetSettingIDs.MidiChannel, 9);
			setMachineTargetSettingByID(prog_change, 0, TargetSettingIDs.ProgramNumber, pc);
			setTargetLocation(prog_change, 0, MuteModules.Performer, Destinations.Scenes, pc);

			muteCfg.midiMachines.push(prog_change);
		}

		for (var bc = 0; bc < MAXIMUM_BANKS; bc++) {
			var bank_change = getMidiMachineByID(DefaultMachineID.MidiBankChangeID);
			setMachineTargetSettingByID(bank_change, 0, TargetSettingIDs.MidiChannel, 9);
			setMachineTargetSettingByID(bank_change, 0, TargetSettingIDs.ContinuousControlerValue, bc);
			setTargetLocation(bank_change, 0, MuteModules.Performer, Destinations.Banks, bc);

			muteCfg.midiMachines.push(bank_change);
		}

		for (var m = 0; m < MAX_MIDI_CHANNELS; m++) {
			var mute = getMidiMachineByID(DefaultMachineID.GMMidiMute);
			setMachineTargetSettingByID(mute, 0, TargetSettingIDs.MidiChannel, m + 1);

			if (m < 8) {
				setTargetLocation(mute, 0, MuteModules.Performer, Destinations.MuteChannels, m);
			} else {
				setTargetLocation(mute, 0, MuteModules.Expander1, Destinations.MuteChannels, m - 8);
			}
			muteCfg.midiMachines.push(mute);
		}
		return muteCfg;
	}

	const toggleMuteStatus = (mutesConfig, muteModule, bankNum, sceneNum, muteChannel) => {
		mutesConfig.banks[bankNum].scenes[sceneNum].modules[muteModule].mutes[muteChannel] = !mutesConfig.banks[bankNum].scenes[sceneNum].modules[muteModule].mutes[muteChannel];
	}

	const loadFromMidi = (muteConfig, midiInputPort, midiOutputPort) => {
		// Colin writes this crap
	}

	const saveToMidi = (muteConfig, midiInputPort, midiOutputPort) => {
		// Colin writes this crap
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
