import React from "react";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4 rounded-lg shadow-md mb-4 flex justify-between items-center flex-row">
      <ul className="flex gap-8">
        <li>
          <Link className="text-white text-2xl font-bold" to="/antibiotics">
            Antibiotics
          </Link>
        </li>
        <li>
          <Link className="text-white text-2xl font-bold" to="/bacteria">
            Bacteria
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
