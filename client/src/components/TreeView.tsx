import React from "react";
import type { Antibiotic, Bacteria } from "../types";
import { itemContainerClass, itemContainerClassSub } from "../styles/styles";
import ToggleGroupButton from "./ToggleGroupButton";

interface TreeViewProps {
  data: Antibiotic[] | Bacteria[];
  setSelectedAntibiotic?: (antibiotic: Antibiotic) => void;
  setSelectedBacteria?: (bacteriaName: string) => void;
}

const TreeView: React.FC<TreeViewProps> = ({
  data,
  setSelectedAntibiotic,
  setSelectedBacteria,
}) => {
  const handleAntibioticSelect = (antibiotic: Antibiotic) => {
    if (setSelectedAntibiotic) {
      setSelectedAntibiotic(antibiotic);
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

  const groupAntibiotics = (antibiotics: Antibiotic[]) => {
    const grouped: { [group: string]: Antibiotic[] } = {};
    antibiotics.forEach((ab) => {
      if (!grouped[ab.group]) grouped[ab.group] = [];
      grouped[ab.group].push(ab);
    });
    // Sort antibiotics within each group
    Object.values(grouped).forEach((arr) =>
      arr.sort((a, b) => a.name.localeCompare(b.name))
    );
    // Return sorted group names and their antibiotics
    return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
  };

  const [showGroup, setShowGroup] = React.useState(true);

  return (
    <div>
      {isAntibioticData(data) ? (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-4 container flex flex-col items-left gap-4">
          <h2 className="text-m font-bold text-white mb-4">Antibiotics</h2>
          {groupAntibiotics(data).map(([group, antibiotics]) => (
            <div className={itemContainerClass} key={group}>
              <div className="flex flex-row items-center gap-2 mb-4">
                <ToggleGroupButton
                  onClick={() => setShowGroup((prev) => !prev)}
                  showGroup={showGroup}
                />
                <div className="text-lg font-semibold mb-2">{group}</div>
              </div>
              {showGroup && (
                <ul>
                  {antibiotics.map((antibiotic) => (
                    <div
                      className={itemContainerClassSub}
                      key={antibiotic.name}
                    >
                      <li
                        className="text-xl font-bold text-white mb-4"
                        key={antibiotic.name}
                        onClick={() => handleAntibioticSelect(antibiotic)}
                      >
                        {antibiotic.name}
                      </li>
                    </div>
                  ))}
                </ul>
              )}
            </div>
          ))}
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
