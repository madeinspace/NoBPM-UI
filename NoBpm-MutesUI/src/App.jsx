import React, { useEffect, useState } from "react";

const App = () => {
  const [midiMessages, setMidiMessages] = useState([]);
  const [midiDevices, setMidiDevices] = useState([]);

  const onMIDIMessage = (message) => {
    const [command, note, velocity] = message.data;
    const newMessage = `Command: ${command}, Note: ${note}, Velocity: ${velocity}`;
    setMidiMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const setupMIDIInputs = (midiAccess) => {
    const devices = [];
    midiAccess.inputs.forEach((input) => {
      console.log(`Listening to MIDI input: ${input.name}`);
      input.onmidimessage = onMIDIMessage;
      devices.push({ id: input.id, name: input.name, type: input.type });
    });
    setMidiDevices(devices);
  };

  useEffect(() => {
    navigator.requestMIDIAccess().then(
      (midiAccess) => {
        console.log("MIDI access granted");

        setupMIDIInputs(midiAccess);

        midiAccess.onstatechange = (event) => {
          console.log(`MIDI device ${event.port.state}: ${event.port.name}`);
          setupMIDIInputs(midiAccess);
        };
      },
      () => {
        console.log("Could not access MIDI devices.");
      }
    );
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">NoBPM MuteUI</h1>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Connected MIDI Devices</h2>
        {midiDevices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {midiDevices.map((device) => (
              <div
                key={device.id}
                className="bg-white p-4 shadow-md rounded-lg border border-gray-200"
              >
                <h3 className="text-lg font-medium">{device.name}</h3>
                <p className="text-gray-600">{device.type}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No MIDI devices connected</p>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">MIDI Messages</h2>
        <div className="bg-white p-4 shadow-md rounded-lg border border-gray-200">
          {midiMessages.length > 0 ? (
            midiMessages.map((msg, index) => (
              <div key={index} className="text-gray-800">
                {msg}
              </div>
            ))
          ) : (
            <p className="text-gray-500">Waiting for MIDI input...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
