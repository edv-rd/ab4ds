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
        <>
          <h2>Antibiotics</h2>
          <ul>
            {data.map((antibiotic) => (
              <li
                key={antibiotic.name}
                onClick={() => handleAntibioticSelect(antibiotic)}
              >
                {antibiotic.name}
                <div>Group: {antibiotic.group}</div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h2>Bacteria</h2>
          <ul>
            {data.map((bacterium) => (
              <li
                key={bacterium.name}
                onClick={() => handleBacteriaSelect(bacterium)}
              >
                {bacterium.name}
                <div>{bacterium.trivia}</div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TreeView;
