

const mongoose = require("mongoose");
const { Schema, Document } = mongoose;

const antibioticSchema = new Schema({
  name: { type: String, required: true },
  group: { type: String, required: true },
  bacteriaKilled: [{ type: String, required: true }],
});

const AntibioticModel = mongoose.model(
  "Antibiotic",
  antibioticSchema
);

module.exports = AntibioticModel;
