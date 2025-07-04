const mongoose = require("mongoose");
const { Schema, Document } = mongoose;

const BacteriaSchema = new Schema({
  name: { type: String, required: true },
  gramStainPositive: { type: Boolean, required: true }, // "Gram-negativ"
  shape: { type: String, required: true }, // "stav"
  capsule: { type: Boolean, required: true }, // "ej kapslad"
  aerob: { type: Boolean, required: true }, // "ej kapslad"
  laktamasProducer: { type: Boolean, required: true }, // "ej kapslad"
  antibioticsSensitive: [{ type: String }], // egentligen en array med Antibiotic-schemas
  antibioticsResistent: [{ type: String }], // egentligen en array med Antibiotic-schemas
  extendedResistance: [{ type: String }], // antingen "ESBL" eller "MRSA" eller "VRE" eller "ingen känd"
  trivia: { type: String }, // "orsakar gärna:" eller "random fakta"
});
const BacteriaModel = mongoose.model(
  "Bacteria",
  BacteriaSchema
);

module.exports = BacteriaModel;
