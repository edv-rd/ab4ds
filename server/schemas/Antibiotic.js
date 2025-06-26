const mongoose = require("mongoose");
const { Schema, Document } = mongoose;

const antibioticSchema = new Schema({
  name: { type: String, required: true },
  laktam: { type: Boolean, required: true },
  group: { type: String, required: true },
  baktericid: { type: Boolean, required: true },
  bacteriaKilled: [{ type: String }],      // <-- allow ObjectId or string
  bacteriaNotKilled: [{ type: String }],   // <-- allow ObjectId or string
  dosage: { type: String, required: true },
  observandum: [{ type: String, required: true }],
});

const AntibioticModel = mongoose.model(
  "Antibiotic",
  antibioticSchema
);

module.exports = AntibioticModel;
