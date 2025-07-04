import React, { useEffect, useState } from "react";
import TreeView from "../components/TreeView.tsx";
import { fetchBacteria } from "../utils/fetchBacteria";
import type { Bacteria } from "../types";
import SearchBar from "../components/SearchBar.tsx";
import ViewSpecimen from "../components/ViewSpecimen";
import AddForm from "../components/AddForm.tsx";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const BacteriaPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name } = useParams<{ name?: string }>();
  const [bacteria, setBacteria] = useState<Bacteria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBacteria, setSelectedBacteria] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bacteriaData = await fetchBacteria();
        setBacteria(bacteriaData);
      } catch (err) {
        setError(`Failed to fetch bacteria data. ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Reset selection when navigating to /bacteria (no params)
  useEffect(() => {
    if (location.pathname === "/bacteria") {
      setSelectedBacteria(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    setSelectedBacteria(name ?? null);
  }, [name]);

  const handleSelectBacteria = (bacteriaName: string) => {
    navigate(`/bacteria/${encodeURIComponent(bacteriaName)}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container bg-gray-950 text-white mx-auto p-4 w-full min-h-screen flex flex-col items-left gap-4">
      <SearchBar
        onSearch={(query: string) => {
          console.log("Search query:", query);
        }}
      />
      {selectedBacteria && (
        <ViewSpecimen name={selectedBacteria} antibiotic={false} />
      )}
      <TreeView data={bacteria} setSelectedBacteria={handleSelectBacteria} />
      <AddForm isAntibiotic={false} />
    </div>
  );
};

export default BacteriaPage;
