import React, { useEffect, useState } from "react";
import TreeView from "../components/TreeView.tsx";
import { fetchBacteria } from "../utils/fetchBacteria";
import type { Bacteria } from "../types";
import SearchBar from "../components/SearchBar.tsx";

const BacteriaPage: React.FC = () => {
  const [bacteria, setBacteria] = useState<Bacteria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      <TreeView data={bacteria} />
    </div>
  );
};

export default BacteriaPage;
