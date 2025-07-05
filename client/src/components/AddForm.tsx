import React, { useState } from "react";
import { putAntibiotic } from "../utils/putAntibiotic";
import { putBacteria } from "../utils/putBacteria";
import {
  itemContainerClass,
  itemContainerClassSub,
  inputClass,
  checkboxClass,
  flexClass,
  labelClass,
  containerClass,
  h2Class,
  toggleLabelClass,
} from "../styles/styles";
import ToggleButton from "./ToggleButton";

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

  return (
    <div className={containerClass}>
      <form onSubmit={handleSubmit}>
        <h2 className={h2Class}>
          {isAntibiotic ? "Add Antibiotic" : "Add Bacteria"}
        </h2>
        {isAntibiotic ? (
          <div className={itemContainerClass}>
            <div className={itemContainerClassSub}>
              <label className={labelClass}>
                Name
                <input
                  type="text"
                  value={antibioticName}
                  onChange={(e) => setAntibioticName(e.target.value)}
                  required
                  className={inputClass}
                />
              </label>
            </div>
            <div
              className={`${itemContainerClassSub} flex flex-row items-center gap-2`}
            >
              <ToggleButton
                onClick={() => setLaktam(!laktam)}
                iconToggled={laktam}
              />
              <label
                className={`${toggleLabelClass} ${
                  laktam ? "font-bold" : "font-medium"
                }`}
              >
                Laktam
              </label>
            </div>
            <div className={itemContainerClassSub}>
              <label className={labelClass}>
                Group
                <input
                  type="text"
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                  required
                  className={inputClass}
                />
              </label>
            </div>
            <div
              className={`${itemContainerClassSub} flex flex-row items-center gap-2`}
            >
              <ToggleButton
                onClick={() => setBaktericid(!baktericid)}
                iconToggled={baktericid}
              />
              <label
                className={`${toggleLabelClass} ${
                  baktericid ? "font-bold" : "font-medium"
                }`}
              >
                Baktericid
              </label>
            </div>
            <div className={itemContainerClassSub}>
              <label className={labelClass}>
                Bacteria Killed (comma separated)
                <input
                  type="text"
                  value={bacteriaKilled}
                  onChange={(e) => setBacteriaKilled(e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
            <div className={itemContainerClassSub}>
              <label className={labelClass}>
                Bacteria Not Killed (comma separated)
                <input
                  type="text"
                  value={bacteriaNotKilled}
                  onChange={(e) => setBacteriaNotKilled(e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
            <div className={itemContainerClassSub}>
              <label className={labelClass}>
                Dosage
                <input
                  type="text"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
            <div className={itemContainerClassSub}>
              <label className={labelClass}>
                Observandum (comma separated)
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
          <div className={itemContainerClass}>
            <div className={itemContainerClassSub}>
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
            <div
              className={`${itemContainerClassSub} flex flex-row items-center gap-2`}
            >
              <ToggleButton
                onClick={() => setGramStainPositive(!gramStainPositive)}
                iconToggled={gramStainPositive}
              />
              <label
                className={`${toggleLabelClass} ${
                  gramStainPositive ? "font-bold" : "font-medium"
                }`}
              >
                Gram Stain
              </label>
            </div>
            <div className={itemContainerClassSub}>
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
            <div
              className={`${itemContainerClassSub} flex flex-row items-center gap-2`}
            >
              <ToggleButton
                onClick={() => setCapsule(!capsule)}
                iconToggled={capsule}
              />
              <label
                className={`${toggleLabelClass} ${
                  capsule ? "font-bold" : "font-medium"
                }`}
              >
                Capsule
              </label>
            </div>
            <div
              className={`${itemContainerClassSub} flex flex-row items-center gap-2`}
            >
              <ToggleButton
                onClick={() => setAerob(!aerob)}
                iconToggled={aerob}
              />
              <label
                className={`${toggleLabelClass} ${
                  aerob ? "font-bold" : "font-medium"
                }`}
              >
                Aerob
              </label>
            </div>
            <div
              className={`${itemContainerClassSub} flex flex-row items-center gap-2`}
            >
              <ToggleButton
                onClick={() => setLaktamasProducer(!laktamasProducer)}
                iconToggled={laktamasProducer}
              />
              <label
                className={`${toggleLabelClass} ${
                  laktamasProducer ? "font-bold" : "font-medium"
                }`}
              >
                Laktamasproducer
              </label>
            </div>
            <div className={itemContainerClassSub}>
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
            <div className={itemContainerClassSub}>
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
            <div className={itemContainerClassSub}>
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
            <div className={itemContainerClassSub}>
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
