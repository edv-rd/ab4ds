import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TreeView from "../components/TreeView";
import SearchBar from "../components/SearchBar";
import AddForm from "../components/AddForm";
import ViewSpecimen from "../components/ViewSpecimen";
import { fetchAntibiotics } from "../utils/fetchAntibiotics";

import type { Antibiotic } from "../types";

const AntibioticsPage: React.FC = () => {
  const { group, name } = useParams<{ name?: string; group?: string }>();
  const location = useLocation();
  const [antibiotics, setAntibiotics] = useState<Antibiotic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [selectedAntibiotic, setSelectedAntibiotic] = useState<string | null>(
    null
  );
  const [selectedAntibioticGroup, setSelectedAntibioticGroup] = useState<
    string | null
  >(null);

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

  useEffect(() => {
    if (name) {
      // Perform some action based on the `name` parameter
      setSelectedAntibiotic(name);
    }
  }, [name]);

  const handleSelectAntibiotic = (antibiotic: Antibiotic) => {
    navigate(
      `/antibiotics/${encodeURIComponent(
        antibiotic.group
      )}/${encodeURIComponent(antibiotic.name)}`
    );
  };

  useEffect(() => {
    if (group) {
      // Perform some action based on the `group` parameter
      setSelectedAntibioticGroup(group);
      console.log("Selected group:", selectedAntibioticGroup);
    }
  }, [group]);

  // Reset selection when navigating to /antibiotics (no params)
  useEffect(() => {
    if (location.pathname === "/antibiotics") {
      setSelectedAntibiotic(null);
    }
  }, [location.pathname]);

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
      {selectedAntibiotic && (
        <ViewSpecimen name={selectedAntibiotic} antibiotic />
      )}

      <TreeView
        data={antibiotics}
        setSelectedAntibiotic={handleSelectAntibiotic}
      />
      <AddForm isAntibiotic={true} />
    </div>
  );
};

export default AntibioticsPage;
