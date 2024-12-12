"use client";

import { useConfig } from "../utils/ConfigContext";

export default function Contact() {
  const { mutesManager, addMidiMachine, removeMidiMachine, muteConfig } =
    useConfig();

  console.log("contact muteConfig: ", muteConfig);
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">NoBPM UI</div>
          <div className="flex space-x-4">
            <a href="./" className="hover:text-gray-400">
              NoBPM UI editor
            </a>
            <a href="./contact" className="hover:text-gray-400">
              Contact
            </a>
          </div>
        </div>
      </nav>

      <main className="grid grid-cols-[25%_50%_25%] flex-grow">
        Contact here
      </main>
    </div>
  );
}
