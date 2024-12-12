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

const SourceType = Object.freeze({
  CC_VALUE: 0,
  CC_TOGGLE_VALUE: 1,
  PROGRAM_CHANGE: 2,
});

const DestinationType = Object.freeze({
  MuteChannels: 0,
  Scenes: 1,
  Banks: 2,
});

const DefaultMachineID = Object.freeze({
  MidiProgramChangeID: 0xac01,
  MidiBankChangeID: 0xab01,
  GMMidiMute: 0xaa51,
  RolandTR6s: 0x0105,
  RolandTR8s: 0x0106,
});

const SettingIDs = Object.freeze({
  MidiChannel: 0x1a,
  ProgramNumber: 0xda,
  ToggleOnLevel: 0x3a,
  ToggleOffLevel: 0x35,
  ContinuousConrollerChange: 0x44,
  ContinuousControlerValue: 0x65,
  ContinuousControlerNumber: 0x66,
});

function createMutesManager() {
  const setMachineSourceSettingByID = (machine, sourceIndex, sid, value) => {
    for (var s = 0; s < machine.sources[sourceIndex].settings.length; s++) {
      if (machine.sources[sourceIndex].settings[s].id == sid) {
        machine.sources[sourceIndex].settings[s].value = value;
        break;
      }
    }
  };

  /*
	const setSourceLocation = (machine, sourceIndex, module, dest, index) => {
		if (module != MuteModules.Performer) {
			if (dest != DestinationType.MuteChannels) {
				throw new Error("Expander modules only have mute channels! (no scenes or banks)");
			}
		}
		machine.sources[sourceIndex].destination.module = module;
		machine.sources[sourceIndex].destination.dest = dest;
		machine.sources[sourceIndex].destination.index = index;
	}
*/

  const activateAllDestinations = (machine) => {
    for (var s = 0; s < machine.sources.length; s++) {
      machine.sources[s].destination.active = true;
    }
  };

  // Returns an array of all the supported midi machines, each one will have a display name, id number and the mappings
  const getAllMidiMachines = () => {
    return {
      midiMachines: [
        {
          display_name: "Roland TR6s",
          user_name: "",
          group: "Drum Machines",
          id: DefaultMachineID.RolandTR6s,
          settings: [
            {
              id: SettingIDs.MidiChannel,
              display_name: "MIDI Channel",
              value: 10,
              min: 1,
              max: 16,
            },
          ],
          sources: [
            {
              display_name: "BD Level",
              user_name: "",
              default_dest: DestinationType.MuteChannels,
              destination: {
                module: MuteModules.Performer,
                index: 0,
                dest: DestinationType.MuteChannels,
                active: false,
              },
              type: SourceType.CC_TOGGLE_VALUE,
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 10,
                  min: 1,
                  max: 16,
                },
                {
                  cannot_edit: true,
                  id: SettingIDs.ContinuousControlerNumber,
                  display_name: "CC Number",
                  value: 24,
                },
                {
                  id: SettingIDs.ToggleOnLevel,
                  display_name: "Un-muted Volume Level",
                  value: 127,
                  min: 0,
                  max: 127,
                },
                {
                  id: SettingIDs.ToggleOffLevel,
                  display_name: "Muted Volume Level",
                  value: 0,
                  min: 0,
                  max: 127,
                },
              ],
            },
            {
              display_name: "SD Level",
              user_name: "",
              default_dest: DestinationType.MuteChannels,
              destination: {
                module: MuteModules.Performer,
                index: 1,
                dest: DestinationType.MuteChannels,
                active: false,
              },
              type: SourceType.CC_TOGGLE_VALUE,
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 10,
                  min: 1,
                  max: 16,
                },
                {
                  cannot_edit: true,
                  id: SettingIDs.ContinuousControlerNumber,
                  display_name: "CC Number",
                  value: 29,
                },
                {
                  id: SettingIDs.ToggleOnLevel,
                  display_name: "Un-muted Volume Level",
                  value: 127,
                  min: 0,
                  max: 127,
                },
                {
                  id: SettingIDs.ToggleOffLevel,
                  display_name: "Muted Volume Level",
                  value: 0,
                  min: 0,
                  max: 127,
                },
              ],
            },
            {
              display_name: "LT Level",
              user_name: "",
              default_dest: DestinationType.MuteChannels,
              destination: {
                module: MuteModules.Performer,
                index: 2,
                dest: DestinationType.MuteChannels,
                active: false,
              },
              type: SourceType.CC_TOGGLE_VALUE,
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 10,
                  min: 1,
                  max: 16,
                },
                {
                  cannot_edit: true,
                  id: SettingIDs.ContinuousControlerNumber,
                  display_name: "CC Number",
                  value: 48,
                },
                {
                  id: SettingIDs.ToggleOnLevel,
                  display_name: "Un-muted Volume Level",
                  value: 127,
                  min: 0,
                  max: 127,
                },
                {
                  id: SettingIDs.ToggleOffLevel,
                  display_name: "Muted Volume Level",
                  value: 0,
                  min: 0,
                  max: 127,
                },
              ],
            },
            {
              display_name: "HC Level",
              user_name: "",
              default_dest: DestinationType.MuteChannels,
              destination: {
                module: MuteModules.Performer,
                index: 3,
                dest: DestinationType.MuteChannels,
                active: false,
              },
              type: SourceType.CC_TOGGLE_VALUE,
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 10,
                  min: 1,
                  max: 16,
                },
                {
                  cannot_edit: true,
                  id: SettingIDs.ContinuousControlerNumber,
                  display_name: "CC Number",
                  value: 60,
                },
                {
                  id: SettingIDs.ToggleOnLevel,
                  display_name: "Un-muted Volume Level",
                  value: 127,
                  min: 0,
                  max: 127,
                },
                {
                  id: SettingIDs.ToggleOffLevel,
                  display_name: "Muted Volume Level",
                  value: 0,
                  min: 0,
                  max: 127,
                },
              ],
            },
            {
              display_name: "CH Level",
              user_name: "",
              default_dest: DestinationType.MuteChannels,
              destination: {
                module: MuteModules.Performer,
                index: 4,
                dest: DestinationType.MuteChannels,
                active: false,
              },
              type: SourceType.CC_TOGGLE_VALUE,
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 10,
                  min: 1,
                  max: 16,
                },
                {
                  cannot_edit: true,
                  id: SettingIDs.ContinuousControlerNumber,
                  display_name: "CC Number",
                  value: 63,
                },
                {
                  id: SettingIDs.ToggleOnLevel,
                  display_name: "Un-muted Volume Level",
                  value: 127,
                  min: 0,
                  max: 127,
                },
                {
                  id: SettingIDs.ToggleOffLevel,
                  display_name: "Muted Volume Level",
                  value: 0,
                  min: 0,
                  max: 127,
                },
              ],
            },
            {
              display_name: "OH Level",
              user_name: "",
              default_dest: DestinationType.MuteChannels,
              destination: {
                module: MuteModules.Performer,
                index: 5,
                dest: DestinationType.MuteChannels,
                active: false,
              },
              type: SourceType.CC_TOGGLE_VALUE,
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 10,
                  min: 1,
                  max: 16,
                },
                {
                  cannot_edit: true,
                  id: SettingIDs.ContinuousControlerNumber,
                  display_name: "CC Number",
                  value: 82,
                },
                {
                  id: SettingIDs.ToggleOnLevel,
                  display_name: "Un-muted Volume Level",
                  value: 127,
                  min: 0,
                  max: 127,
                },
                {
                  id: SettingIDs.ToggleOffLevel,
                  display_name: "Muted Volume Level",
                  value: 0,
                  min: 0,
                  max: 127,
                },
              ],
            },
            {
              display_name: "Reverb Level",
              user_name: "",
              default_dest: DestinationType.MuteChannels,
              destination: {
                module: MuteModules.Performer,
                index: 6,
                dest: DestinationType.MuteChannels,
                active: false,
              },
              type: SourceType.CC_TOGGLE_VALUE,
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 10,
                  min: 1,
                  max: 16,
                },
                {
                  cannot_edit: true,
                  id: SettingIDs.ContinuousControlerNumber,
                  display_name: "CC Number",
                  value: 91,
                },
                {
                  id: SettingIDs.ToggleOnLevel,
                  display_name: "Un-muted Volume Level",
                  value: 127,
                  min: 0,
                  max: 127,
                },
                {
                  id: SettingIDs.ToggleOffLevel,
                  display_name: "Muted Volume Level",
                  value: 0,
                  min: 0,
                  max: 127,
                },
              ],
            },
          ],
        },

        {
          display_name: "Program Change",
          user_name: "",
          group: "General MIDI",
          id: DefaultMachineID.MidiProgramChangeID,
          settings: [
            {
              id: SettingIDs.MidiChannel,
              display_name: "MIDI Channel",
              value: 1,
              min: 1,
              max: 16,
            },
          ],
          sources: [
            {
              display_name: "Program Change",
              user_name: "Program 1",
              default_dest: DestinationType.Scenes,
              destination: {
                module: MuteModules.Performer,
                index: 0,
                dest: DestinationType.Scenes,
                active: false,
              },
              type: SourceType.PROGRAM_CHANGE,
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 1,
                  min: 1,
                  max: 16,
                },
                {
                  id: SettingIDs.ProgramNumber,
                  display_name: "Program Number",
                  value: 0,
                  min: 0,
                  max: 127,
                },
              ],
            },
            {
              display_name: "Program Change",
              user_name: "Program 2",
              default_dest: DestinationType.Scenes,
              destination: {
                module: MuteModules.Performer,
                index: 1,
                dest: DestinationType.Scenes,
              },
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 1,
                  min: 1,
                  max: 16,
                },
                {
                  id: SettingIDs.ProgramNumber,
                  display_name: "Program Number",
                  value: 1,
                  min: 0,
                  max: 127,
                },
              ],
            },
            {
              display_name: "Program Change",
              user_name: "Program 3",
              default_dest: DestinationType.Scenes,
              destination: {
                module: MuteModules.Performer,
                index: 2,
                dest: DestinationType.Scenes,
                active: false,
              },
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 1,
                  min: 1,
                  max: 16,
                },
                {
                  id: SettingIDs.ProgramNumber,
                  display_name: "Program Number",
                  value: 2,
                  min: 0,
                  max: 127,
                },
              ],
            },
            {
              display_name: "Program Change",
              user_name: "Program 4",
              default_dest: DestinationType.Scenes,
              destination: {
                module: MuteModules.Performer,
                index: 3,
                dest: DestinationType.Scenes,
                active: false,
              },
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 1,
                  min: 1,
                  max: 16,
                },
                {
                  id: SettingIDs.ProgramNumber,
                  display_name: "Program Number",
                  value: 3,
                  min: 0,
                  max: 127,
                },
              ],
            },
          ],
        },
        {
          display_name: "Bank Select (CC #0)",
          user_name: "",
          group: "General MIDI",
          type: SourceType.CC_VALUE,
          id: DefaultMachineID.MidiBankChangeID,
          settings: [
            {
              id: SettingIDs.MidiChannel,
              display_name: "MIDI Channel",
              value: 1,
              min: 1,
              max: 16,
            },
            {
              cannot_edit: true,
              id: SettingIDs.ContinuousControlerNumber,
              display_name: "CC Number",
              value: 0,
            },
          ],
          sources: [
            {
              display_name: "Bank Select",
              user_name: "Bank 1",
              default_dest: DestinationType.Banks,
              destination: {
                module: MuteModules.Performer,
                index: 0,
                dest: DestinationType.Banks,
                active: false,
              },
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 1,
                  min: 1,
                  max: 16,
                },
                {
                  id: SettingIDs.ContinuousControlerValue,
                  display_name: "Bank Number",
                  value: 0,
                  min: 0,
                  max: 127,
                },
              ],
            },
            {
              display_name: "Bank Select",
              user_name: "Bank 2",
              default_dest: DestinationType.Banks,
              destination: {
                module: MuteModules.Performer,
                index: 1,
                dest: DestinationType.Banks,
                active: false,
              },
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 1,
                  min: 1,
                  max: 16,
                },
                {
                  id: SettingIDs.ContinuousControlerValue,
                  display_name: "Bank Number",
                  value: 1,
                  min: 0,
                  max: 127,
                },
              ],
            },
            {
              display_name: "Bank Select",
              user_name: "Bank 3",
              default_dest: DestinationType.Banks,
              destination: {
                module: MuteModules.Performer,
                index: 2,
                dest: DestinationType.Banks,
                active: false,
              },
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 1,
                  min: 1,
                  max: 16,
                },
                {
                  id: SettingIDs.ContinuousControlerValue,
                  display_name: "Bank Number",
                  value: 2,
                  min: 0,
                  max: 127,
                },
              ],
            },
            {
              display_name: "Bank Select",
              user_name: "Bank 4",
              default_dest: DestinationType.Banks,
              destination: {
                module: MuteModules.Performer,
                index: 3,
                dest: DestinationType.Banks,
                active: false,
              },
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 1,
                  min: 1,
                  max: 16,
                },
                {
                  id: SettingIDs.ContinuousControlerValue,
                  display_name: "Bank Number",
                  value: 3,
                  min: 0,
                  max: 127,
                },
              ],
            },
            {
              display_name: "Bank Select",
              user_name: "Bank 5",
              default_dest: DestinationType.Banks,
              destination: {
                module: MuteModules.Performer,
                index: 4,
                dest: DestinationType.Banks,
                active: false,
              },
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 1,
                  min: 1,
                  max: 16,
                },
                {
                  id: SettingIDs.ContinuousControlerValue,
                  display_name: "Bank Number",
                  value: 4,
                  min: 0,
                  max: 127,
                },
              ],
            },
            {
              display_name: "Bank Select",
              user_name: "Bank 6",
              default_dest: DestinationType.Banks,
              destination: {
                module: MuteModules.Performer,
                index: 5,
                dest: DestinationType.Banks,
                active: false,
              },
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 1,
                  min: 1,
                  max: 16,
                },
                {
                  id: SettingIDs.ContinuousControlerValue,
                  display_name: "Bank Number",
                  value: 5,
                  min: 0,
                  max: 127,
                },
              ],
            },
            {
              display_name: "Bank Select",
              user_name: "Bank 7",
              default_dest: DestinationType.Banks,
              destination: {
                module: MuteModules.Performer,
                index: 6,
                dest: DestinationType.Banks,
                active: false,
              },
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 1,
                  min: 1,
                  max: 16,
                },
                {
                  id: SettingIDs.ContinuousControlerValue,
                  display_name: "Bank Number",
                  value: 6,
                  min: 0,
                  max: 127,
                },
              ],
            },
            {
              display_name: "Bank Select",
              user_name: "Bank 8",
              default_dest: DestinationType.Banks,
              destination: {
                module: MuteModules.Performer,
                index: 7,
                dest: DestinationType.Banks,
                active: false,
              },
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 1,
                  min: 1,
                  max: 16,
                },
                {
                  id: SettingIDs.ContinuousControlerValue,
                  display_name: "Bank Number",
                  value: 7,
                  min: 0,
                  max: 127,
                },
              ],
            },
          ],
        },

        {
          display_name: "MIDI CC Change",
          user_name: "",
          group: "General MIDI",
          id: DefaultMachineID.ContinuousConrollerChange,
          settings: [
            {
              id: SettingIDs.MidiChannel,
              display_name: "MIDI Channel",
              value: 1,
              min: 1,
              max: 16,
            },
          ],
          type: SourceType.CC_VALUE,
          sources: [
            {
              display_name: "MIDI CC Change",
              user_name: "Modulation (CC #1)",
              default_dest: DestinationType.Banks,
              destination: {
                module: MuteModules.Performer,
                index: 0,
                dest: DestinationType.MuteChannels,
                active: false,
              },
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 1,
                  min: 1,
                  max: 16,
                },
                {
                  id: SettingIDs.ContinuousControlerNumber,
                  display_name: "CC Number",
                  value: 1,
                  min: 0,
                  max: 127,
                },
                {
                  id: SettingIDs.ContinuousControlerValue,
                  display_name: "CC Value",
                  value: 0,
                  min: 0,
                  max: 127,
                },
              ],
            },
            {
              display_name: "MIDI CC Change",
              user_name: "Breath Controller (CC #2)",
              default_dest: DestinationType.Banks,
              destination: {
                module: MuteModules.Performer,
                index: 1,
                dest: DestinationType.MuteChannels,
                active: false,
              },
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 1,
                  min: 1,
                  max: 16,
                },
                {
                  id: SettingIDs.ContinuousControlerNumber,
                  display_name: "CC Number",
                  value: 2,
                  min: 0,
                  max: 127,
                },
                {
                  id: SettingIDs.ContinuousControlerValue,
                  display_name: "CC Value",
                  value: 0,
                  min: 0,
                  max: 127,
                },
              ],
            },
            {
              display_name: "MIDI CC Change",
              user_name: "Balance (CC #8)",
              default_dest: DestinationType.Banks,
              destination: {
                module: MuteModules.Performer,
                index: 1,
                dest: DestinationType.MuteChannels,
                active: false,
              },
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 1,
                  min: 1,
                  max: 16,
                },
                {
                  id: SettingIDs.ContinuousControlerNumber,
                  display_name: "CC Number",
                  value: 8,
                  min: 0,
                  max: 127,
                },
                {
                  id: SettingIDs.ContinuousControlerValue,
                  display_name: "CC Value",
                  value: 0,
                  min: 0,
                  max: 127,
                },
              ],
            },
            {
              display_name: "MIDI CC Change",
              user_name: "Expression (CC #11)",
              default_dest: DestinationType.Banks,
              destination: {
                module: MuteModules.Performer,
                index: 2,
                dest: DestinationType.MuteChannels,
                active: false,
              },
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 1,
                  min: 1,
                  max: 16,
                },
                {
                  id: SettingIDs.ContinuousControlerNumber,
                  display_name: "CC Number",
                  value: 11,
                  min: 0,
                  max: 127,
                },
                {
                  id: SettingIDs.ContinuousControlerValue,
                  display_name: "CC Value",
                  value: 0,
                  min: 0,
                  max: 127,
                },
              ],
            },
            {
              display_name: "MIDI CC Change",
              user_name: "General Purpose (CC #16)",
              default_dest: DestinationType.Banks,
              destination: {
                module: MuteModules.Performer,
                index: 3,
                dest: DestinationType.MuteChannels,
                active: false,
              },
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 1,
                  min: 1,
                  max: 16,
                },
                {
                  id: SettingIDs.ContinuousControlerNumber,
                  display_name: "CC Number",
                  value: 16,
                  min: 0,
                  max: 127,
                },
                {
                  id: SettingIDs.ContinuousControlerValue,
                  display_name: "CC Value",
                  value: 0,
                  min: 0,
                  max: 127,
                },
              ],
            },
          ],
        },

        {
          display_name: "MIDI Mute (MIDI CC 7 - Volume)",
          user_name: "",
          group: "General MIDI",
          id: DefaultMachineID.GMMidiMute,
          type: SourceType.CC_TOGGLE_VALUE,
          settings: [
            {
              cannot_edit: true,
              id: SettingIDs.ContinuousControlerNumber,
              display_name: "CC Number",
              value: 7,
            },
          ],
          sources: [
            {
              display_name: "Volume CC Mute",
              user_name: "Channel 1",
              destination: {
                module: MuteModules.Performer,
                index: 0,
                dest: DestinationType.MuteChannels,
                active: false,
              },
              default_dest: DestinationType.MuteChannels,
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 1,
                  min: 1,
                  max: 16,
                },
                {
                  id: SettingIDs.ToggleOnLevel,
                  display_name: "Un-muted Volume Level",
                  value: 127,
                  min: 0,
                  max: 127,
                },
                {
                  id: SettingIDs.ToggleOffLevel,
                  display_name: "Muted Volume Level",
                  value: 0,
                  min: 0,
                  max: 127,
                },
              ],
            },

            {
              display_name: "Volume CC Mute",
              user_name: "Channel 2",
              destination: {
                module: MuteModules.Performer,
                index: 1,
                dest: DestinationType.MuteChannels,
                active: false,
              },
              default_dest: DestinationType.MuteChannels,
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 2,
                  min: 1,
                  max: 16,
                },
                {
                  id: SettingIDs.ToggleOnLevel,
                  display_name: "Un-muted Volume Level",
                  value: 127,
                  min: 0,
                  max: 127,
                },
                {
                  id: SettingIDs.ToggleOffLevel,
                  display_name: "Muted Volume Level",
                  value: 0,
                  min: 0,
                  max: 127,
                },
              ],
            },

            {
              display_name: "Volume CC Mute",
              user_name: "Channel 3",
              destination: {
                module: MuteModules.Performer,
                index: 2,
                dest: DestinationType.MuteChannels,
                active: false,
              },
              default_dest: DestinationType.MuteChannels,
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 3,
                  min: 1,
                  max: 16,
                },
                {
                  id: SettingIDs.ToggleOnLevel,
                  display_name: "Un-muted Volume Level",
                  value: 127,
                  min: 0,
                  max: 127,
                },
                {
                  id: SettingIDs.ToggleOffLevel,
                  display_name: "Muted Volume Level",
                  value: 0,
                  min: 0,
                  max: 127,
                },
              ],
            },

            {
              display_name: "Volume CC Mute",
              user_name: "Channel 4",
              destination: {
                module: MuteModules.Performer,
                index: 3,
                dest: DestinationType.MuteChannels,
                active: false,
              },
              default_dest: DestinationType.MuteChannels,
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 4,
                  min: 1,
                  max: 16,
                },
                {
                  id: SettingIDs.ToggleOnLevel,
                  display_name: "Un-muted Volume Level",
                  value: 127,
                  min: 0,
                  max: 127,
                },
                {
                  id: SettingIDs.ToggleOffLevel,
                  display_name: "Muted Volume Level",
                  value: 0,
                  min: 0,
                  max: 127,
                },
              ],
            },

            {
              display_name: "Volume CC Mute",
              user_name: "Channel 5",
              destination: {
                module: MuteModules.Performer,
                index: 4,
                dest: DestinationType.MuteChannels,
                active: false,
              },
              default_dest: DestinationType.MuteChannels,
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 5,
                  min: 1,
                  max: 16,
                },
                {
                  id: SettingIDs.ToggleOnLevel,
                  display_name: "Un-muted Volume Level",
                  value: 127,
                  min: 0,
                  max: 127,
                },
                {
                  id: SettingIDs.ToggleOffLevel,
                  display_name: "Muted Volume Level",
                  value: 0,
                  min: 0,
                  max: 127,
                },
              ],
            },

            {
              display_name: "Volume CC Mute",
              user_name: "Channel 6",
              destination: {
                module: MuteModules.Performer,
                index: 5,
                dest: DestinationType.MuteChannels,
                active: false,
              },
              default_dest: DestinationType.MuteChannels,
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 6,
                  min: 1,
                  max: 16,
                },
                {
                  id: SettingIDs.ToggleOnLevel,
                  display_name: "Un-muted Volume Level",
                  value: 127,
                  min: 0,
                  max: 127,
                },
                {
                  id: SettingIDs.ToggleOffLevel,
                  display_name: "Muted Volume Level",
                  value: 0,
                  min: 0,
                  max: 127,
                },
              ],
            },

            {
              display_name: "Volume CC Mute",
              user_name: "Channel 7",
              destination: {
                module: MuteModules.Performer,
                index: 6,
                dest: DestinationType.MuteChannels,
                active: false,
              },
              default_dest: DestinationType.MuteChannels,
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 7,
                  min: 1,
                  max: 16,
                },
                {
                  id: SettingIDs.ToggleOnLevel,
                  display_name: "Un-muted Volume Level",
                  value: 127,
                  min: 0,
                  max: 127,
                },
                {
                  id: SettingIDs.ToggleOffLevel,
                  display_name: "Muted Volume Level",
                  value: 0,
                  min: 0,
                  max: 127,
                },
              ],
            },

            {
              display_name: "Volume CC Mute",
              user_name: "Channel 8",
              destination: {
                module: MuteModules.Performer,
                index: 7,
                dest: DestinationType.MuteChannels,
                active: false,
              },
              default_dest: DestinationType.MuteChannels,
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 8,
                  min: 1,
                  max: 16,
                },
                {
                  id: SettingIDs.ToggleOnLevel,
                  display_name: "Un-muted Volume Level",
                  value: 127,
                  min: 0,
                  max: 127,
                },
                {
                  id: SettingIDs.ToggleOffLevel,
                  display_name: "Muted Volume Level",
                  value: 0,
                  min: 0,
                  max: 127,
                },
              ],
            },

            {
              display_name: "Volume CC Mute",
              user_name: "Channel 9",
              destination: {
                module: MuteModules.Expander1,
                index: 0,
                dest: DestinationType.MuteChannels,
                active: false,
              },
              default_dest: DestinationType.MuteChannels,
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 9,
                  min: 1,
                  max: 16,
                },
                {
                  id: SettingIDs.ToggleOnLevel,
                  display_name: "Un-muted Volume Level",
                  value: 127,
                  min: 0,
                  max: 127,
                },
                {
                  id: SettingIDs.ToggleOffLevel,
                  display_name: "Muted Volume Level",
                  value: 0,
                  min: 0,
                  max: 127,
                },
              ],
            },

            {
              display_name: "Volume CC Mute",
              user_name: "Channel 10",
              destination: {
                module: MuteModules.Expander1,
                index: 1,
                dest: DestinationType.MuteChannels,
                active: false,
              },
              default_dest: DestinationType.MuteChannels,
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 10,
                  min: 1,
                  max: 16,
                },
                {
                  id: SettingIDs.ToggleOnLevel,
                  display_name: "Un-muted Volume Level",
                  value: 127,
                  min: 0,
                  max: 127,
                },
                {
                  id: SettingIDs.ToggleOffLevel,
                  display_name: "Muted Volume Level",
                  value: 0,
                  min: 0,
                  max: 127,
                },
              ],
            },

            {
              display_name: "Volume CC Mute",
              user_name: "Channel 11",
              destination: {
                module: MuteModules.Expander1,
                index: 2,
                dest: DestinationType.MuteChannels,
                active: false,
              },
              default_dest: DestinationType.MuteChannels,
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 11,
                  min: 1,
                  max: 16,
                },
                {
                  id: SettingIDs.ToggleOnLevel,
                  display_name: "Un-muted Volume Level",
                  value: 127,
                  min: 0,
                  max: 127,
                },
                {
                  id: SettingIDs.ToggleOffLevel,
                  display_name: "Muted Volume Level",
                  value: 0,
                  min: 0,
                  max: 127,
                },
              ],
            },

            {
              display_name: "Volume CC Mute",
              user_name: "Channel 12",
              destination: {
                module: MuteModules.Expander1,
                index: 3,
                dest: DestinationType.MuteChannels,
                active: false,
              },
              default_dest: DestinationType.MuteChannels,
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 12,
                  min: 1,
                  max: 16,
                },
                {
                  id: SettingIDs.ToggleOnLevel,
                  display_name: "Un-muted Volume Level",
                  value: 127,
                  min: 0,
                  max: 127,
                },
                {
                  id: SettingIDs.ToggleOffLevel,
                  display_name: "Muted Volume Level",
                  value: 0,
                  min: 0,
                  max: 127,
                },
              ],
            },

            {
              display_name: "Volume CC Mute",
              user_name: "Channel 13",
              destination: {
                module: MuteModules.Expander1,
                index: 4,
                dest: DestinationType.MuteChannels,
                active: false,
              },
              default_dest: DestinationType.MuteChannels,
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 13,
                  min: 1,
                  max: 16,
                },
                {
                  id: SettingIDs.ToggleOnLevel,
                  display_name: "Un-muted Volume Level",
                  value: 127,
                  min: 0,
                  max: 127,
                },
                {
                  id: SettingIDs.ToggleOffLevel,
                  display_name: "Muted Volume Level",
                  value: 0,
                  min: 0,
                  max: 127,
                },
              ],
            },
            {
              display_name: "Volume CC Mute",
              user_name: "Channel 14",
              destination: {
                module: MuteModules.Expander1,
                index: 5,
                dest: DestinationType.MuteChannels,
                active: false,
              },
              default_dest: DestinationType.MuteChannels,
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 14,
                  min: 1,
                  max: 16,
                },
                {
                  id: SettingIDs.ToggleOnLevel,
                  display_name: "Un-muted Volume Level",
                  value: 127,
                  min: 0,
                  max: 127,
                },
                {
                  id: SettingIDs.ToggleOffLevel,
                  display_name: "Muted Volume Level",
                  value: 0,
                  min: 0,
                  max: 127,
                },
              ],
            },
            {
              display_name: "Volume CC Mute",
              user_name: "Channel 15",
              destination: {
                module: MuteModules.Expander1,
                index: 6,
                dest: DestinationType.MuteChannels,
                active: false,
              },
              default_dest: DestinationType.MuteChannels,
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 15,
                  min: 1,
                  max: 16,
                },
                {
                  id: SettingIDs.ToggleOnLevel,
                  display_name: "Un-muted Volume Level",
                  value: 127,
                  min: 0,
                  max: 127,
                },
                {
                  id: SettingIDs.ToggleOffLevel,
                  display_name: "Muted Volume Level",
                  value: 0,
                  min: 0,
                  max: 127,
                },
              ],
            },

            {
              display_name: "Volume CC Mute",
              user_name: "Channel 16",
              destination: {
                module: MuteModules.Expander1,
                index: 7,
                dest: DestinationType.MuteChannels,
                active: false,
              },
              default_dest: DestinationType.MuteChannels,
              settings: [
                {
                  id: SettingIDs.MidiChannel,
                  display_name: "MIDI Channel",
                  value: 16,
                  min: 1,
                  max: 16,
                },
                {
                  id: SettingIDs.ToggleOnLevel,
                  display_name: "Un-muted Volume Level",
                  value: 127,
                  min: 0,
                  max: 127,
                },
                {
                  id: SettingIDs.ToggleOffLevel,
                  display_name: "Muted Volume Level",
                  value: 0,
                  min: 0,
                  max: 127,
                },
              ],
            },
          ],
        },
      ],
    };
  };

  const all_midi_machines = getAllMidiMachines();

  const getMidiMachineByID = (machine_id) => {
    for (var mach = 0; mach < all_midi_machines.midiMachines.length; mach++) {
      if (all_midi_machines.midiMachines[mach].id == machine_id) {
        return structuredClone(all_midi_machines.midiMachines[mach]);
      }
    }
    throw new Error(
      "getMidiMachineByID - Unknown Machine ID " + machine_id.toString()
    );
  };

  // Return an array of all the possible color themes - the user can select one, then thats just blasted over the top inside the JSON mutes config object
  const getAllColorThemes = () => {
    const RGB_BLACK = [0, 0, 0];
    const RGB_RED = [0xff, 0x00, 0x00];
    const RGB_GREEN = [0x00, 0xff, 0x00];
    const RGB_BLUE = [0x00, 0x00, 0xff];
    const RGB_YELLOW = [0xff, 0xff, 0x00];
    const RGB_ORANGE = [0xff, 0x55, 0x05];
    const RGB_PURPLE = [0xff, 0x00, 0xff];
    const RGB_WHITE = [0xff, 0xff, 0xff];
    const RGB_CYAN = [0x00, 0xdd, 0xff];
    const RGB_PINK = [0xff, 0x90, 0xab];

    const DIM = (col) => {
      const dim_faktor = 6;
      return [
        Math.round(col[0] / dim_faktor),
        Math.round(col[1] / dim_faktor),
        Math.round(col[2] / dim_faktor),
      ];
    };
    const MID = (col) => {
      const mid_faktor = 3;
      return [
        Math.round(col[0] / mid_faktor),
        Math.round(col[1] / mid_faktor),
        Math.round(col[2] / mid_faktor),
      ];
    };

    return {
      color_theme_list: [
        {
          display_name: "Standard",
          id: 0xbad0,
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
            },
          },
        },
        {
          display_name: "High Contrast",
          id: 0xb33f,
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
            },
          },
        },
        {
          display_name: "Some Funky Colors",
          id: 0xdead,
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
            },
          },
        },
      ],
    };
  };

  const setColorTheme = (mutesConfig, selectedTheme) => {
    const sT = structuredClone(selectedTheme);
    mutesConfig.colorTheme.id = sT.id;
    mutesConfig.colorTheme.colors.functions = sT.colors.functions;
    mutesConfig.colorTheme.colors.links = sT.colors.links;
    mutesConfig.colorTheme.colors.runtime = sT.colors.runtime;
    mutesConfig.colorTheme.colors.midi = sT.colors.midi;
  };

  const createEmptyMute = () => {
    return {
      mutes: [false, false, false, false, false, false, false, false],
      mode: [
        LinkModes.None,
        LinkModes.None,
        LinkModes.None,
        LinkModes.None,
        LinkModes.None,
        LinkModes.None,
        LinkModes.None,
        LinkModes.None,
      ],
    };
  };

  const createEmptyScene = () => {
    var scene = {
      modules: [],
    };
    for (let i = 0; i < MAXIMUM_MODULES; i++) {
      scene.modules.push(createEmptyMute());
    }
    return scene;
  };

  const createEmptyBank = () => {
    var bank = {
      selected_scene: 0, // This is the scene that is loaded by default when the euro module powers on
      scenes: [],
    };
    for (let i = 0; i < MAXIMUM_SCENES; i++) {
      bank.scenes.push(createEmptyScene());
    }
    return bank;
  };

  const createEmptyMutesConfig = () => {
    var muteCfg = {
      schema_version: 101,
      selected_bank: 0, // This is the bank thats loaded by default when the euro module powers on
      num_expanders: MAXIMUM_EXPANDERS,
      banks: [],
      colorTheme: {
        colors: { functions: {}, links: {} },
      },
      midiMachines: [],
    };

    for (let i = 0; i < MAXIMUM_BANKS; i++) {
      muteCfg.banks.push(createEmptyBank());
    }

    setColorTheme(
      muteCfg,
      getAllColorThemes().color_theme_list[DEFAULT_COLOR_THEME]
    );
    /*
		for (var pc = 0; pc < MAXIMUM_SCENES; pc++) {
			var prog_change = getMidiMachineByID(DefaultMachineID.MidiProgramChangeID);

			setMachineSourceSettingByID(prog_change, 0, SettingIDs.MidiChannel, 9);
			setMachineSourceSettingByID(prog_change, 0, SettingIDs.ProgramNumber, pc);
			setSourceLocation(prog_change, 0, MuteModules.Performer, DestinationType.Scenes, pc);

			muteCfg.midiMachines.push(prog_change);
		}

		for (var bc = 0; bc < MAXIMUM_BANKS; bc++) {
			var bank_change = getMidiMachineByID(DefaultMachineID.MidiBankChangeID);
			setMachineSourceSettingByID(bank_change, 0, SettingIDs.MidiChannel, 9);
			setMachineSourceSettingByID(bank_change, 0, SettingIDs.ContinuousControlerValue, bc);
			setSourceLocation(bank_change, 0, MuteModules.Performer, DestinationType.Banks, bc);

			muteCfg.midiMachines.push(bank_change);
		}

		for (var m = 0; m < MAX_MIDI_CHANNELS; m++) {
			var mute = getMidiMachineByID(DefaultMachineID.GMMidiMute);
			setMachineSourceSettingByID(mute, 0, SettingIDs.MidiChannel, m + 1);

			if (m < 8) {
				setSourceLocation(mute, 0, MuteModules.Performer, DestinationType.MuteChannels, m);
			} else {
				setSourceLocation(mute, 0, MuteModules.Expander1, DestinationType.MuteChannels, m - 8);
			}
			muteCfg.midiMachines.push(mute);
		}
*/
    var bank_change = getMidiMachineByID(DefaultMachineID.MidiBankChangeID);
    activateAllDestinations(bank_change);
    muteCfg.midiMachines.push(bank_change);

    var prog_change = getMidiMachineByID(DefaultMachineID.MidiProgramChangeID);
    activateAllDestinations(prog_change);
    muteCfg.midiMachines.push(prog_change);

    var mutes = getMidiMachineByID(DefaultMachineID.GMMidiMute);
    activateAllDestinations(mutes);
    muteCfg.midiMachines.push(mutes);

    return muteCfg;
  };

  const toggleMuteStatus = (
    mutesConfig,
    muteModule,
    bankNum,
    sceneNum,
    muteChannel
  ) => {
    mutesConfig.banks[bankNum].scenes[sceneNum].modules[muteModule].mutes[
      muteChannel
    ] =
      !mutesConfig.banks[bankNum].scenes[sceneNum].modules[muteModule].mutes[
        muteChannel
      ];
  };

  const loadFromMidi = (muteConfig, midiInputPort, midiOutputPort) => {
    // Colin writes this crap
  };

  const saveToMidi = (muteConfig, midiInputPort, midiOutputPort) => {
    // Colin writes this crap
  };

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
