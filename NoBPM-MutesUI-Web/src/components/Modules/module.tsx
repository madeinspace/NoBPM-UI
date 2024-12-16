import React from "react";

const Module = ({ name }: any) => {
  const mutesButtons = Array.from({ length: 8 }, (_, index) => index + 1);

  return (
    <div className="bg-gray-500 rounded-lg shadow-lg p-6 flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
      <h3 className="text-white text-xl font-semibold mb-4">{name}</h3>
      <div className="grid grid-cols-2 gap-4 w-full">
        {mutesButtons.map((muteButton, idx) => (
          <div
            key={muteButton}
            className="flex flex-col justify-center items-center bg-blue-700 text-white font-semibold rounded shadow hover:bg-blue-800 transition duration-200 w-20 h-20 p-2"
          >
            <span className="text-xs mb-1">
              {idx === 0 ? "BD Level" : `No assignment`}
            </span>
            <span className="text-lg">{muteButton}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Module;
