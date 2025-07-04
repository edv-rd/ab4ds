import React, { useEffect, useState } from "react";
import { fetchBacteria } from "../utils/fetchBacteria";
import { fetchAntibiotics } from "../utils/fetchAntibiotics";

interface ViewSpecimenProps {
  name?: string;
  id?: string;
  antibiotic?: boolean; // default: antibiotic
}

const API_URL = import.meta.env.VITE_API_URL;

interface AntibioticData {
  name: string;
  laktam: boolean;
  group: string;
  baktericid: boolean;
  bacteriaKilled: string[];
  bacteriaNotKilled: string[];
  dosage: string;
  observandum: string[];
}

interface BacteriaData {
  name: string;
  gramStainPositive: boolean;
  shape: string;
  capsule: boolean;
  aerob: boolean;
  laktamasProducer: boolean;
  antibioticsSensitive: string[];
  antibioticsResistent: string[];
  extendedResistance: string;
  trivia: string;
}

const ViewSpecimen: React.FC<ViewSpecimenProps> = ({
  name,
  id,
  antibiotic = true,
}) => {
  const [data, setData] = useState<AntibioticData | BacteriaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [linkedSpecimenName, setLinkedSpecimenName] = useState<string | null>(
    null
  );
  const [allBacteria, setAllBacteria] = useState<string[]>([]);
  const [allAntibiotics, setAllAntibiotics] = useState<string[]>([]);

  useEffect(() => {
    if (!name && !id) return;
    setLoading(true);
    setError(null);

    let endpoint = "";
    if (id) {
      endpoint = antibiotic
        ? `${API_URL}/api/antibiotics/${id}`
        : `${API_URL}/api/bacteria/${id}`;
    } else if (name) {
      endpoint = antibiotic
        ? `${API_URL}/api/antibiotics/find-by-name/${encodeURIComponent(name)}`
        : `${API_URL}/api/bacteria/find-by-name/${encodeURIComponent(name)}`;
    }

    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [name, id, antibiotic]);

  useEffect(() => {
    // Fetch all names for lookup
    fetchBacteria().then((bacteria) =>
      setAllBacteria(bacteria.map((b) => b.name))
    );
    fetchAntibiotics().then((antibiotics) =>
      setAllAntibiotics(antibiotics.map((a) => a.name))
    );
  }, []);

  if (loading) return <div>Loading specimen...</div>;
  if (error) return <div>Not found: {error}</div>;
  if (!data) return <div>No data found.</div>;

  // If a linked specimen is selected, show it recursively
  if (linkedSpecimenName) {
    return (
      <ViewSpecimen name={linkedSpecimenName ?? undefined} antibiotic={false} />
    );
  }

  if (antibiotic) {
    const ab = data as AntibioticData;
    return (
      <div style={{ border: "1px solid #ccc", padding: 16, margin: 16 }}>
        <h2>{ab.name}</h2>
        <div>
          <strong>Laktam:</strong> {ab.laktam ? "Yes" : "No"}
        </div>
        <div>
          <strong>Group:</strong> {ab.group}
        </div>
        <div>
          <strong>Baktericid:</strong> {ab.baktericid ? "Yes" : "No"}
        </div>
        <div>
          <strong>Bacteria Killed:</strong>
          <ul>
            {ab.bacteriaKilled.map((bactName) =>
              allBacteria.includes(bactName) ? (
                <li key={bactName}>
                  <button onClick={() => setLinkedSpecimenName(bactName)}>
                    {bactName}
                  </button>
                </li>
              ) : (
                <li key={bactName}>{bactName}</li>
              )
            )}
          </ul>
        </div>
        <div>
          <strong>Bacteria Not Killed:</strong>
          <ul>
            {ab.bacteriaNotKilled.map((bactName) =>
              allBacteria.includes(bactName) ? (
                <li key={bactName}>
                  <button onClick={() => setLinkedSpecimenName(bactName)}>
                    {bactName}
                  </button>
                </li>
              ) : (
                <li key={bactName}>{bactName}</li>
              )
            )}
          </ul>
        </div>
        <div>
          <strong>Dosage:</strong> {ab.dosage}
        </div>
        <div>
          <strong>Observandum:</strong> {ab.observandum.join(", ")}
        </div>
      </div>
    );
  } else {
    const bact = data as BacteriaData;
    return (
      <div style={{ border: "1px solid #ccc", padding: 16, margin: 16 }}>
        <h2>{bact.name}</h2>
        <div>
          <strong>Gram Stain Positive:</strong>{" "}
          {bact.gramStainPositive ? "Yes" : "No"}
        </div>
        <div>
          <strong>Shape:</strong> {bact.shape}
        </div>
        <div>
          <strong>Capsule:</strong> {bact.capsule ? "Yes" : "No"}
        </div>
        <div>
          <strong>Aerob:</strong> {bact.aerob ? "Yes" : "No"}
        </div>
        <div>
          <strong>Laktamas Producer:</strong>{" "}
          {bact.laktamasProducer ? "Yes" : "No"}
        </div>
        <div>
          <strong>Antibiotics Sensitive:</strong>
          <ul>
            {bact.antibioticsSensitive.map((antibioticName) =>
              allAntibiotics.includes(antibioticName) ? (
                <li key={antibioticName}>
                  <button onClick={() => setLinkedSpecimenName(antibioticName)}>
                    {antibioticName}
                  </button>
                </li>
              ) : (
                <li key={antibioticName}>{antibioticName}</li>
              )
            )}
          </ul>
        </div>
        <div>
          <strong>Antibiotics Resistent:</strong>
          <ul>
            {bact.antibioticsResistent.map((antibioticName) =>
              allAntibiotics.includes(antibioticName) ? (
                <li key={antibioticName}>
                  <button onClick={() => setLinkedSpecimenName(antibioticName)}>
                    {antibioticName}
                  </button>
                </li>
              ) : (
                <li key={antibioticName}>{antibioticName}</li>
              )
            )}
          </ul>
        </div>
        <div>
          <strong>Extended Resistance:</strong> {bact.extendedResistance}
        </div>
        <div>
          <strong>Trivia:</strong> {bact.trivia}
        </div>
      </div>
    );
  }
};

export default ViewSpecimen;
