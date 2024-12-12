"use client";
import Devices from "src/components/Devices";
import { Modules } from "src/components/Modules";
import Navigation from "src/components/Navigation";
import { Settings } from "src/components/Settings";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="grid grid-cols-[30%_45%_25%] flex-grow">
        <Devices />
        <Modules />
        <Settings />
      </main>
    </div>
  );
}
