import React, { useState } from "react";
import { putAntibiotic } from "../utils/putAntibiotic";
import { putBacteria } from "../utils/putBacteria";

const AddForm: React.FC = () => {
  const [isAntibiotic, setIsAntibiotic] = useState(true);

  // Antibiotic fields
  const [antibioticName, setAntibioticName] = useState("");
  const [laktam, setLaktam] = useState(true);
  const [group, setGroup] = useState("");
  const [baktericid, setBaktericid] = useState(true);
  const [bacteriaKilled, setBacteriaKilled] = useState<string>("");
  const [bacteriaNotKilled, setBacteriaNotKilled] = useState<string>("");
  const [dosage, setDosage] = useState("");
  const [observandum, setObservandum] = useState<string>("");

  // Bacteria fields
  const [bacteriaName, setBacteriaName] = useState("");
  const [gramStainPositive, setGramStainPositive] = useState(true);
  const [shape, setShape] = useState("");
  const [capsule, setCapsule] = useState(false);
  const [aerob, setAerob] = useState(false);
  const [laktamasProducer, setLaktamasProducer] = useState(false);
  const [antibioticsSensitive, setAntibioticsSensitive] = useState<string>("");
  const [antibioticsResistent, setAntibioticsResistent] = useState<string>("");
  const [extendedResistance, setExtendedResistance] = useState("");
  const [bacteriaTrivia, setBacteriaTrivia] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAntibiotic) {
      // Prepare Antibiotic data
      const data = {
        id: "", // or generate a temporary id if needed
        name: antibioticName,
        laktam,
        group,
        baktericid,
        bacteriaKilled: bacteriaKilled
          .split(",")
          .map((s) => s.trim().toLocaleLowerCase()), // Convert to Bacteria[]
        bacteriaNotKilled: bacteriaNotKilled
          .split(",")
          .map((s) => s.trim().toLocaleLowerCase()), // Convert to Bacteria[]
        dosage,
        observandum: observandum.split(",").map((s) => s.trim()),
      };
      // TODO: Send data to server
      putAntibiotic(data)
        .then((response) => {
          console.log("Antibiotic added successfully:", response);
        })
        .catch((error) => {
          console.error("Error adding antibiotic:", error);
        });
    } else {
      // Prepare Bacteria data
      const data = {
        name: bacteriaName,
        gramStainPositive,
        shape,
        capsule,
        aerob,
        laktamasProducer,
        antibioticsSensitive: antibioticsSensitive
          .split(",")
          .map((s) => s.trim().toLocaleLowerCase()),
        antibioticsResistent: antibioticsResistent
          .split(",")
          .map((s) => s.trim().toLocaleLowerCase()),
        extendedResistance,
        trivia: bacteriaTrivia,
      };
      // TODO: Send data to server
      putBacteria(data)
        .then((response) => {
          console.log("bacteria added successfully:", response);
        })
        .catch((error) => {
          console.error("Error adding bacteria:", error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isAntibiotic ? "Add Antibiotic" : "Add Bacteria"}</h2>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isAntibiotic}
            onChange={() => setIsAntibiotic(!isAntibiotic)}
          />
          {isAntibiotic ? "Switch to Add Bacteria" : "Switch to Add Antibiotic"}
        </label>
      </div>
      {isAntibiotic ? (
        <>
          <div>
            <label>
              Name:
              <input
                type="text"
                value={antibioticName}
                onChange={(e) => setAntibioticName(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Laktam:
              <input
                type="checkbox"
                checked={laktam}
                onChange={() => setLaktam(!laktam)}
              />
            </label>
          </div>
          <div>
            <label>
              Group:
              <input
                type="text"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Baktericid:
              <input
                type="checkbox"
                checked={baktericid}
                onChange={() => setBaktericid(!baktericid)}
              />
            </label>
          </div>
          <div>
            <label>
              Bacteria Killed (comma separated):
              <input
                type="text"
                value={bacteriaKilled}
                onChange={(e) => setBacteriaKilled(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Bacteria Not Killed (comma separated):
              <input
                type="text"
                value={bacteriaNotKilled}
                onChange={(e) => setBacteriaNotKilled(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Dosage:
              <input
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Observandum (comma separated):
              <input
                type="text"
                value={observandum}
                onChange={(e) => setObservandum(e.target.value)}
              />
            </label>
          </div>
        </>
      ) : (
        <>
          <div>
            <label>
              Name:
              <input
                type="text"
                value={bacteriaName}
                onChange={(e) => setBacteriaName(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Gram Stain:
              <input
                type="checkbox"
                checked={gramStainPositive}
                onChange={() => setGramStainPositive(!gramStainPositive)}
              />
            </label>
          </div>
          <div>
            <label>
              Shape:
              <input
                type="text"
                value={shape}
                onChange={(e) => setShape(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Capsule:
              <input
                type="checkbox"
                checked={capsule}
                onChange={() => setCapsule(!capsule)}
              />
            </label>
          </div>
          <div>
            <label>
              Aerob:
              <input
                type="checkbox"
                checked={aerob}
                onChange={() => setAerob(!aerob)}
              />
            </label>
          </div>
          <div>
            <label>
              Laktamas Producer:
              <input
                type="checkbox"
                checked={laktamasProducer}
                onChange={() => setLaktamasProducer(!laktamasProducer)}
              />
            </label>
          </div>
          <div>
            <label>
              Antibiotics Sensitive (comma separated):
              <input
                type="text"
                value={antibioticsSensitive}
                onChange={(e) => setAntibioticsSensitive(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Antibiotics Resistent (comma separated):
              <input
                type="text"
                value={antibioticsResistent}
                onChange={(e) => setAntibioticsResistent(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Extended Resistance:
              <input
                type="text"
                value={extendedResistance}
                onChange={(e) => setExtendedResistance(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Trivia:
              <input
                type="text"
                value={bacteriaTrivia}
                onChange={(e) => setBacteriaTrivia(e.target.value)}
              />
            </label>
          </div>
        </>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddForm;
