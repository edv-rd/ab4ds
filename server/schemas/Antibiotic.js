

const mongoose = require("mongoose");
const { Schema, Document } = mongoose;

const antibioticSchema = new Schema({
  name: { type: String, required: true }, // "Gentamicin"
  laktam: { type: Boolean, required: true }, // "icke beta-laktam"
  group: { type: String, required: true }, // "aminoglykosid"
  laktam: { type: Boolean, required: true }, // "baktericid"
  bacteriaKilled: [{ type: Schema.Types.ObjectId, ref: "Bacteria" }], // references Bacteria schemas
  bacteriaNotKilled: [{ type: Schema.Types.ObjectId, ref: "Bacteria" }], // references Bacteria schemas
  dosage: { type: String, required: true }, // "1-2 mg/kg iv"
  observandum: [{ type: String, required: true }], // "Njurtoxicitet" punktlista med inlägg i fritext
});

const AntibioticModel = mongoose.model(
  "Antibiotic",
  antibioticSchema
);

module.exports = AntibioticModel;
