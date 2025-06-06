import React from "react";
import type { Antibiotic, Bacteria } from "../types";

interface TreeViewProps {
  data: Antibiotic[] | Bacteria[];
}

const TreeView: React.FC<TreeViewProps> = ({ data }) => {
  const [selectedAntibiotic, setSelectedAntibiotic] =
    React.useState<Antibiotic | null>(null);
  const [selectedBacteria, setSelectedBacteria] =
    React.useState<Bacteria | null>(null);

  const handleAntibioticSelect = (antibiotic: Antibiotic) => {
    setSelectedAntibiotic(antibiotic);
  };

  const handleBacteriaSelect = (bacteria: Bacteria) => {
    setSelectedBacteria(bacteria);
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
                key={antibiotic.id}
                onClick={() => handleAntibioticSelect(antibiotic)}
              >
                {antibiotic.name}
                <div>Group: {antibiotic.group}</div>
              </li>
            ))}
          </ul>
          {selectedAntibiotic && (
            <div>
              <h3>Selected Antibiotic:</h3>
              <pre>{JSON.stringify(selectedAntibiotic, null, 2)}</pre>
            </div>
          )}
        </>
      ) : (
        <>
          <h2>Bacteria</h2>
          <ul>
            {data.map((bacterium) => (
              <li
                key={bacterium.id}
                onClick={() => handleBacteriaSelect(bacterium)}
              >
                {bacterium.name}
                <div>{bacterium.shortInfo}</div>
              </li>
            ))}
          </ul>
          {selectedBacteria && (
            <div>
              <h3>Selected Bacteria:</h3>
              <pre>{JSON.stringify(selectedBacteria, null, 2)}</pre>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TreeView;
