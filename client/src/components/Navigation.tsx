import React from "react";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/antibiotics">Antibiotics</Link>
        </li>
        <li>
          <Link to="/bacteria">Bacteria</Link>
        </li>
        <li>
          <Link to="/add-antibiotic">Add Antibiotic</Link>
        </li>
        <li>
          <Link to="/add-bacteria">Add Bacteria</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
