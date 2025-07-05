import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";

interface ToggleButtonProps {
  onClick: () => void;
  iconToggled: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  onClick,
  iconToggled,
}) => {
  const toggleIcon = iconToggled ? faToggleOn : faToggleOff;
  return (
    <div className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition-colors">
      <button type="button" onClick={onClick}>
        <FontAwesomeIcon icon={toggleIcon} className="text-xl" />
      </button>
    </div>
  );
};

export default ToggleButton;
