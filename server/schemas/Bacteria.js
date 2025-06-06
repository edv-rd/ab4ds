const mongoose = require("mongoose");
const { Schema, Document } = mongoose;



const BacteriaSchema = new Schema({
  name: { type: String, required: true },
  shortInfo: { type: String, required: true },
  antibiotics: [{ type: String, required: true }],
});

const BacteriaModel = mongoose.model(
  "Bacteria",
  BacteriaSchema
);

module.exports = BacteriaModel;
