import React from "react";
import type { Antibiotic, Bacteria } from "../types";

interface TreeViewProps {
  data: Antibiotic[] | Bacteria[];
  setSelectedAntibiotic?: (antibioticName: string) => void;
  setSelectedBacteria?: (bacteriaName: string) => void;
}

const TreeView: React.FC<TreeViewProps> = ({
  data,
  setSelectedAntibiotic,
  setSelectedBacteria,
}) => {
  const handleAntibioticSelect = (antibiotic: Antibiotic) => {
    if (setSelectedAntibiotic) {
      setSelectedAntibiotic(antibiotic.name); // Pass the name (or id if you prefer)
    }
  };

  const handleBacteriaSelect = (bacteria: Bacteria) => {
    if (setSelectedBacteria) {
      setSelectedBacteria(bacteria.name);
    }
  };

  // Type guard to check if the data is Antibiotic[]
  const isAntibioticData = (
    data: Antibiotic[] | Bacteria[]
  ): data is Antibiotic[] => {
    return data.length === 0 || "group" in data[0];
  };

  return (
    <div>
      {isAntibioticData(data) ? (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-4 container flex flex-col items-left gap-4">
          <h2 className="text-m font-bold text-white mb-4">Antibiotics</h2>
          <ul>
            {data.map((antibiotic) => (
              <li
                className="text-xl font-bold text-white mb-4"
                key={antibiotic.name}
                onClick={() => handleAntibioticSelect(antibiotic)}
              >
                {antibiotic.name}
                <div className="text-m font-thin text-white mb-4">
                  {antibiotic.group}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-4 container flex flex-col items-left gap-4">
          <h2 className="text-m font-bold text-white mb-4">Bacteria</h2>
          <ul>
            {data.map((bacterium) => (
              <li
                className="text-xl font-bold text-white mb-4"
                key={bacterium.name}
                onClick={() => handleBacteriaSelect(bacterium)}
              >
                {bacterium.name}
                <div className="text-m font-thin text-white mb-4">
                  {bacterium.trivia}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TreeView;
