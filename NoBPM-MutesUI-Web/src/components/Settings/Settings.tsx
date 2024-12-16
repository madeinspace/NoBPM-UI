// src/components/Settings.tsx
import React, { useEffect } from "react";
import { useConfig } from "src/app/utils/ConfigContext";
import { SelectedSource } from "src/types/SelectedSource";
import NameDisplay from "./nameDisplay";
import DestinationDetails from "./destinationDetails";
import SettingsList from "./settingList";

export const Settings: React.FC = () => {
  const { selectedSource } = useConfig();

  useEffect(() => {
    console.log("selectedSource: ", selectedSource);
  }, [selectedSource]);

  if (!selectedSource) {
    return (
      <div className="bg-gray-300 text-white p-4">
        No selected source available.
      </div>
    );
  }

  return (
    <div className="bg-gray-800 text-white p-6 shadow-md flex flex-col items-start w-full rounded-lg">
      <h2 className="text-2xl mb-4">Settings</h2>

      {Array.isArray(selectedSource.settings) &&
      selectedSource.settings.length > 0 ? (
        <div className="w-full mt-4">
          <NameDisplay
            displayName={selectedSource.display_name}
            userName={selectedSource.user_name}
          />

          <SettingsList settings={selectedSource.settings} />
          <DestinationDetails destination={selectedSource.destination} />
        </div>
      ) : (
        <p>No settings available.</p>
      )}
    </div>
  );
};
