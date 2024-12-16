// src/components/SettingsList.tsx
import React from "react";
import { SettingsListProps } from "src/types/types";

const SettingsList: React.FC<SettingsListProps> = ({ settings }) => {
  return (
    <div className="w-full mt-4">
      {settings.map((item, index) => (
        <div
          key={item.id}
          className={`mb-4 p-2 rounded-md shadow-inner ${
            index % 2 === 0 ? "bg-gray-300" : "bg-gray-400"
          }`}
        >
          <span className="text-sm font-semibold">{item.display_name}</span>
        </div>
      ))}
    </div>
  );
};

export default SettingsList;
