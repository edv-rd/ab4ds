import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";

interface ToggleGroupButtonProps {
  onClick: () => void;
  showGroup: boolean;
}

const ToggleGroupButton: React.FC<ToggleGroupButtonProps> = ({
  onClick,
  showGroup,
}) => {
  const toggleIcon = showGroup ? faToggleOn : faToggleOff;
  return (
    <div>
      <button
        type="button"
        className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition-colors"
        onClick={onClick}
      >
        <FontAwesomeIcon icon={toggleIcon} className="text-xl" />
      </button>
    </div>
  );
};

export default ToggleGroupButton;
