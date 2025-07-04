import React, { useState } from "react";
import { putAntibiotic } from "../utils/putAntibiotic";
import { putBacteria } from "../utils/putBacteria";

interface AddFormProps {
  isAntibiotic: boolean;
}

const AddForm: React.FC<AddFormProps> = ({ isAntibiotic }) => {
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
        name: antibioticName,
        laktam,
        group,
        baktericid,
        bacteriaKilled: bacteriaKilled
          .split(",")
          .map((s) => s.trim().toLocaleLowerCase()),
        bacteriaNotKilled: bacteriaNotKilled
          .split(",")
          .map((s) => s.trim().toLocaleLowerCase()),
        dosage,
        observandum: observandum.split(",").map((s) => s.trim()),
      };
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
      putBacteria(data)
        .then((response) => {
          console.log("bacteria added successfully:", response);
        })
        .catch((error) => {
          console.error("Error adding bacteria:", error);
        });
    }
  };

  const inputClass =
    "block w-full px-3 py-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2";

  const checkboxClass =
    "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600";

  const flexClass = "flex flex-col items-left gap-4 mb-4";

  const labelClass = "text-sm font-medium text-gray-300 mb-1";
  return (
    <div className="container bg-gray-800 rounded-lg shadow-md text-white mx-auto p-4 w-full min-h-screen ">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">
          {isAntibiotic ? "Add Antibiotic" : "Add Bacteria"}
        </h2>
        {isAntibiotic ? (
          <div className={flexClass}>
            <div>
              <label className={labelClass}>
                Name:
                <input
                  type="text"
                  value={antibioticName}
                  onChange={(e) => setAntibioticName(e.target.value)}
                  required
                  className={inputClass}
                />
              </label>
            </div>
            <div>
              <label className={labelClass}>
                <input
                  type="checkbox"
                  checked={laktam}
                  onChange={() => setLaktam(!laktam)}
                  className={checkboxClass}
                />
                Laktam
              </label>
            </div>
            <div>
              <label className={labelClass}>
                Group:
                <input
                  type="text"
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                  required
                  className={inputClass}
                />
              </label>
            </div>
            <div>
              <label className={labelClass}>
                <input
                  type="checkbox"
                  checked={baktericid}
                  onChange={() => setBaktericid(!baktericid)}
                  className={checkboxClass}
                />
                Baktericid
              </label>
            </div>
            <div>
              <label className={labelClass}>
                Bacteria Killed (comma separated):
                <input
                  type="text"
                  value={bacteriaKilled}
                  onChange={(e) => setBacteriaKilled(e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
            <div>
              <label className={labelClass}>
                Bacteria Not Killed (comma separated):
                <input
                  type="text"
                  value={bacteriaNotKilled}
                  onChange={(e) => setBacteriaNotKilled(e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
            <div>
              <label className={labelClass}>
                Dosage:
                <input
                  type="text"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
            <div>
              <label className={labelClass}>
                Observandum (comma separated):
                <input
                  type="text"
                  value={observandum}
                  onChange={(e) => setObservandum(e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
          </div>
        ) : (
          <div className={flexClass}>
            <div>
              <label className={labelClass}>
                Name:
                <input
                  type="text"
                  value={bacteriaName}
                  onChange={(e) => setBacteriaName(e.target.value)}
                  required
                  className={inputClass}
                />
              </label>
            </div>
            <div>
              <label className={labelClass}>
                <input
                  type="checkbox"
                  checked={gramStainPositive}
                  onChange={() => setGramStainPositive(!gramStainPositive)}
                  className={checkboxClass}
                />
                Gram Stain:
              </label>
            </div>
            <div>
              <label className={labelClass}>
                Shape:
                <input
                  type="text"
                  value={shape}
                  onChange={(e) => setShape(e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
            <div>
              <label className={labelClass}>
                <input
                  type="checkbox"
                  checked={capsule}
                  onChange={() => setCapsule(!capsule)}
                  className={checkboxClass}
                />
                Capsule:
              </label>
            </div>
            <div>
              <label className={labelClass}>
                <input
                  type="checkbox"
                  checked={aerob}
                  onChange={() => setAerob(!aerob)}
                  className={checkboxClass}
                />
                Aerob:
              </label>
            </div>
            <div>
              <label className={labelClass}>
                <input
                  type="checkbox"
                  checked={laktamasProducer}
                  onChange={() => setLaktamasProducer(!laktamasProducer)}
                  className={checkboxClass}
                />
                Laktamas Producer:
              </label>
            </div>
            <div>
              <label className={labelClass}>
                Antibiotics Sensitive (comma separated):
                <input
                  type="text"
                  value={antibioticsSensitive}
                  onChange={(e) => setAntibioticsSensitive(e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
            <div>
              <label className={labelClass}>
                Antibiotics Resistent (comma separated):
                <input
                  type="text"
                  value={antibioticsResistent}
                  onChange={(e) => setAntibioticsResistent(e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
            <div>
              <label className={labelClass}>
                Extended Resistance:
                <input
                  type="text"
                  value={extendedResistance}
                  onChange={(e) => setExtendedResistance(e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
            <div>
              <label className={labelClass}>
                Trivia:
                <input
                  type="text"
                  value={bacteriaTrivia}
                  onChange={(e) => setBacteriaTrivia(e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
          </div>
        )}
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddForm;
