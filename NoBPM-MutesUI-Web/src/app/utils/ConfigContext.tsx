"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import createMutesManager, {
  MidiMachine,
  MutesConfig,
  MutesManager,
} from "./MutesConfig";

interface ConfigContextProps {
  mutesManager: MutesManager;
  muteConfig: MutesConfig;
  setMuteConfig: React.Dispatch<React.SetStateAction<MutesConfig>>;
  addMidiMachine: (machine: MidiMachine) => void;
  removeMidiMachine: (id: number) => void;
}

interface ConfigProviderProps {
  children: ReactNode;
}

const ConfigContext = createContext<ConfigContextProps | undefined>(undefined);

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  const mutesManager = createMutesManager();
  const [muteConfig, setMuteConfig] = useState<MutesConfig>(
    mutesManager.createEmptyMutesConfig()
  );
  const [moduleAssignments, setModuleAssignments] = useState<any[]>([]);

  const addMidiMachine = (machine: MidiMachine) => {
    setMuteConfig((prevConfig) => ({
      ...prevConfig,
      midiMachines: [...prevConfig.midiMachines, machine],
    }));
  };

  const removeMidiMachine = (id: number) => {
    setMuteConfig((prevConfig) => ({
      ...prevConfig,
      midiMachines: prevConfig.midiMachines.filter(
        (machine) => machine.id !== id
      ),
    }));
  };

  const editMidiMachineMutes = (machine: MidiMachine) => {};

  const assignSourceToModule = (assignment: any) => {
    setModuleAssignments((prev) => [...prev, assignment]);
    // Optionally, persist to localStorage or backend
  };

  return (
    <ConfigContext.Provider
      value={{
        mutesManager,
        muteConfig,
        setMuteConfig,
        addMidiMachine,
        removeMidiMachine,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = (): ConfigContextProps => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};
