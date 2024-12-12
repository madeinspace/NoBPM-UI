// components/DeviceSources.tsx

import React from "react";
import { MidiMachine } from "../types/MidiMachine";
import { Source } from "src/types/MidiMachinesSources";

interface DeviceSourcesProps {
  device: MidiMachine;
  onEdit: (device: MidiMachine) => void;
  //   onRemove: (id: number) => void;
}

const DeviceSources: React.FC<DeviceSourcesProps> = ({
  device,
  onEdit,
  //   onRemove,
}) => {
  const handleToggleActive = (sourceId: number) => {
    // Implement logic to toggle the active state of a source
    console.log(`Toggling active state for source ID: ${sourceId}`);
  };

  return (
    <div
      id={`device-sources-${device.id}`}
      className="mt-4 p-4 bg-gray-600 rounded-md"
    >
      <h3 className="text-xl font-semibold mb-2">
        Sources for {device.display_name}
      </h3>
      {device.sources && device.sources.length > 0 ? (
        <ul className="list-none">
          {device.sources.map((source: Source, index: number) => (
            <li key={index} className="mb-2">
              <div className="flex justify-between items-center">
                <div>
                  <strong>{source.display_name}</strong> ({source.type})
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(device)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded transition-colors duration-200"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No sources available for this device.</p>
      )}
    </div>
  );
};

export default DeviceSources;
