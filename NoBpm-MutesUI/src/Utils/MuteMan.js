// MuteMan.js
const LinkModes = Object.freeze({
  None: 0,
  Stereo: 1,
  Toggle: 2,
});

const NumModuleMuteChannels = 8;

function createMuteMan() {
  let _connected = false;
  let _num_expanders = 0;
  let _inputPortId = null;
  let _inputPort = null;
  let _outputPortId = null;
  let _outputPort = null;
  let _midiAccess = null;

  const isConnected = () => _connected;

  const connect = (midiAccess, inputPortId, outputPortId) => {
    _midiAccess = midiAccess;
    _outputPort = _midiAccess.outputs.get(outputPortId);
    _inputPort = _midiAccess.inputs.get(inputPortId);
    _connected = true;
    _inputPortId = inputPortId;
    _outputPortId = outputPortId;
    console.log("Bruh im connected!");
    return true;
  };

  const getNumExpanders = () => {
    if (!isConnected()) {
      throw new Error("Mute Manager: Not connected");
    }
    return _num_expanders;
  };

  const getLinkMode = (moduleNum, muteChanNum) => LinkModes.None;

  const setLinkMode = (moduleNum, muteChanNum, linkMode) => {};

  const getIsInverted = (moduleNum, muteChanNum) => false;

  const setIsInverted = (moduleNum, muteChanNum, isInverted) => {};

  const getChannelIsMuted = (moduleNum, muteChanNum) => false;

  const setChannelIsMuted = (moduleNum, muteChanNum, isMuted) => {};

  return {
    isConnected,
    connect,
    getNumExpanders,
    getLinkMode,
    setLinkMode,
    getIsInverted,
    setIsInverted,
    getChannelIsMuted,
    setChannelIsMuted,
  };
}

export default createMuteMan;
