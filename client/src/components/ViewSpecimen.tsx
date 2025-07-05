import React, { useEffect, useState } from "react";
import { fetchBacteria } from "../utils/fetchBacteria";
import { fetchAntibiotics } from "../utils/fetchAntibiotics";
import { useNavigate } from "react-router-dom";
import {
  h2Class,
  itemClass,
  itemContainerClass,
  buttonClass,
  containerClass,
} from "../styles/styles";

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

  const [allBacteria, setAllBacteria] = useState<string[]>([]);
  const [allAntibiotics, setAllAntibiotics] = useState<string[]>([]);
  const navigate = useNavigate();

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
      setAllBacteria(bacteria.map((b: { name: never }) => b.name))
    );
    fetchAntibiotics().then((antibiotics) =>
      setAllAntibiotics(antibiotics.map((a: { name: never }) => a.name))
    );
  }, []);

  if (loading) return <div>Loading specimen...</div>;
  if (error) return <div>Not found: {error}</div>;
  if (!data) return <div>No data found.</div>;

  const ab = data as AntibioticData;
  const bact = data as BacteriaData;

  if (antibiotic) {
    return (
      <div className={containerClass}>
        <h2 className={h2Class}>{ab.name}</h2>
        <div className={itemContainerClass}>
          <strong className={itemClass}>Laktam</strong>
          {ab.laktam ? "Yes" : "No"}
        </div>
        <div className={itemContainerClass}>
          <strong>Group</strong> {ab.group}
        </div>
        <div className={itemContainerClass}>
          <strong>Baktericid</strong> {ab.baktericid ? "Yes" : "No"}
        </div>
        <div className={itemContainerClass}>
          <strong>Bacteria Killed</strong>
          <ul>
            {ab.bacteriaKilled.map((bactName) =>
              allBacteria.includes(bactName) ? (
                <li key={bactName}>
                  <button
                    className={buttonClass}
                    onClick={() =>
                      navigate(`/bacteria/${encodeURIComponent(bactName)}`)
                    }
                  >
                    {bactName}
                  </button>
                </li>
              ) : (
                <li key={bactName}>{bactName}</li>
              )
            )}
          </ul>
        </div>
        <div className={itemContainerClass}>
          <strong>Bacteria Not Killed</strong>
          <ul>
            {ab.bacteriaNotKilled.map((bactName) =>
              allBacteria.includes(bactName) ? (
                <li key={bactName}>
                  <button
                    className={buttonClass}
                    onClick={() =>
                      navigate(`/bacteria/${encodeURIComponent(bactName)}`)
                    }
                  >
                    {bactName}
                  </button>
                </li>
              ) : (
                <li key={bactName}>{bactName}</li>
              )
            )}
          </ul>
        </div>
        <div className={itemContainerClass}>
          <strong>Dosage</strong> {ab.dosage}
        </div>
        <div className={itemContainerClass}>
          <strong>Observandum</strong> {ab.observandum.join(", ")}
        </div>
      </div>
    );
  } else {
    return (
      <div className={containerClass}>
        <h2 className={h2Class}>{bact.name}</h2>
        <div className={itemContainerClass}>
          <strong>Gram Stain Positive</strong>{" "}
          {bact.gramStainPositive ? "Yes" : "No"}
        </div>
        <div className={itemContainerClass}>
          <strong>Shape</strong> {bact.shape}
        </div>
        <div className={itemContainerClass}>
          <strong>Capsule</strong> {bact.capsule ? "Yes" : "No"}
        </div>
        <div className={itemContainerClass}>
          <strong>Aerob</strong> {bact.aerob ? "Yes" : "No"}
        </div>
        <div className={itemContainerClass}>
          <strong>Laktamas Producer</strong>
          {bact.laktamasProducer ? "Yes" : "No"}
        </div>
        <div className={itemContainerClass}>
          <strong>Antibiotics Sensitive</strong>
          <ul>
            {bact.antibioticsSensitive.map((antibioticName) =>
              allAntibiotics.includes(antibioticName) ? (
                <li key={antibioticName}>
                  <button
                    className={buttonClass}
                    onClick={() =>
                      navigate(
                        `/antibiotics/${encodeURIComponent(
                          ab.group
                        )}/${encodeURIComponent(antibioticName)}`
                      )
                    }
                  >
                    {antibioticName}
                  </button>
                </li>
              ) : (
                <li key={antibioticName}>{antibioticName}</li>
              )
            )}
          </ul>
        </div>
        <div className={itemContainerClass}>
          <strong>Antibiotics Resistent</strong>
          <ul>
            {bact.antibioticsResistent.map((antibioticName) =>
              allAntibiotics.includes(antibioticName) ? (
                <li key={antibioticName}>
                  <button
                    className={buttonClass}
                    onClick={() =>
                      navigate(
                        `/antibiotics/${encodeURIComponent(
                          ab.group
                        )}/${encodeURIComponent(antibioticName)}`
                      )
                    }
                  >
                    {antibioticName}
                  </button>
                </li>
              ) : (
                <li key={antibioticName}>
                  <button className={buttonClass}>{antibioticName}</button>
                </li>
              )
            )}
          </ul>
        </div>
        <div className={itemContainerClass}>
          <strong>Extended Resistance</strong> {bact.extendedResistance}
        </div>
        <div className={itemContainerClass}>
          <strong>Trivia</strong> {bact.trivia}
        </div>
      </div>
    );
  }
};

export default ViewSpecimen;
