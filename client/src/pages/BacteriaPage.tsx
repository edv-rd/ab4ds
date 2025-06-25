import React, { useEffect, useState } from "react";
import TreeView from "../components/TreeView.tsx";
import { fetchBacteria } from "../utils/fetchBacteria";
import type { Bacteria } from "../types";
import SearchBar from "../components/SearchBar.tsx";
import ViewSpecimen from "../components/ViewSpecimen";

const BacteriaPage: React.FC = () => {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Bacteria</h1>
      <SearchBar
        onSearch={(query: string) => {
          console.log("Search query:", query);
        }}
      />
      {selectedBacteria && (
        <ViewSpecimen name={selectedBacteria} antibiotic={false} />
      )}
      <TreeView data={bacteria} setSelectedBacteria={setSelectedBacteria} />
    </div>
  );
};

export default BacteriaPage;
