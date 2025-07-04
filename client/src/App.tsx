import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AntibioticsPage from "./pages/AntibioticsPage";
import BacteriaPage from "./pages/BacteriaPage";
import Navigation from "./components/Navigation";

const App: React.FC = () => {
  return (
    <Router>
      <div className="container bg-gray-950 text-white mx-auto p-4 w-full min-h-screen">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/antibiotics" element={<AntibioticsPage />} />
          <Route path="/bacteria" element={<BacteriaPage />} />
          <Route
            path="/antibiotics/:group/:name"
            element={<AntibioticsPage />}
          />
          <Route path="/bacteria/:name" element={<BacteriaPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
