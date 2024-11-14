
const LinkModes = Object.freeze({
	None: 0,
	Stereo: 1,
	Toggle: 2,
});

const NumModuleMuteChannels = 8;

class MuteMan {


	constructor() {
				this._connected = false;
				this._num_expanders = 0;
			            this._inputPortId = null;
			            this._inputPort = null;
			            this._outputPortId = null;
			            this._outputPort = null;
			            this._midiAccess = null;
			}

	isConnected() {
				return this._connected;
			}

	connect(midiAccess,inputPortId,outputPortId) {
                                this._midi = midiAccess;
			        this._outputPort = this._midi.outputs.get( outputPortId );
			        this._inputPort = this._midi.inputs.get( inputPortId );
				this._connected = true;
			        this._inputPortId = inputPortId;
			        this._outputPortId = outputPortId;
			        console.log("Bruh im connected!");
			        return true;
	}
    /*  Global Config Options 
	*/

	/*
	    Mute Channel Methods - each mute channel can be configured differently

		ModuleNum = 0 is always the performer module
		ModuleNum = [1..8] is the expander modules (if connected)
	*/

	getNumExpanders() {
		if ( !this.isConnected() ) {
		throw new Error("Mute Manager: Not connected");
		}
	        return this._num_expanders;
	    }

	getLinkMode(moduleNum,muteChanNum) {
		return LinkModes.None;
	}
	        
	setLinkMode(moduleNum,muteChanNum,linkMode) {
	} 

	getIsInverted(moduleNum, muteChanNum) { 
		return false;
	}

	setIsInverted(moduleNum, muteChanNum, isInverted) { 
	}

	getChannelIsMuted(moduleNum, muteChanNum) {
		return false;
	}

	setChannelIsMuted(moduleNum, muteChanNum, isMuted) {

	}
}


