import React from "react";

interface TripTypeOptionProps {
  label: string;
  selected?: boolean;
}

const TripTypeOption: React.FC<TripTypeOptionProps> = ({
  label,
  selected = false,
}) => {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-xl font-semibold cursor-pointer transition ${
        selected ? "bg-[#A9B388] text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="w-5 h-5 flex items-center justify-center bg-white rounded-full">
        <span
          className={`w-3 h-3 rounded-full ${
            selected ? "bg-[#A9B388]" : "bg-gray-400"
          }`}
        ></span>
      </div>
      {label}
    </div>
  );
};

export default TripTypeOption;
