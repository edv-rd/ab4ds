import React, { useEffect, useState } from "react";
import TreeView from "../components/TreeView";
import SearchBar from "../components/SearchBar";
import AddForm from "../components/AddForm";
import { fetchAntibiotics } from "../utils/fetchAntibiotics";

import type { Antibiotic } from "../types";

const AntibioticsPage: React.FC = () => {
  const [antibiotics, setAntibiotics] = useState<Antibiotic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const antibioticsData = await fetchAntibiotics();
        setAntibiotics(antibioticsData);
      } catch (err) {
        setError(`Failed to fetch antibiotics data. ${err}`);
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
      <h1>Antibiotics</h1>
      <SearchBar
        onSearch={(query: string) => {
          console.log("Search query:", query);
        }}
      />
      <TreeView data={antibiotics} />
      <AddForm />
    </div>
  );
};

export default AntibioticsPage;
