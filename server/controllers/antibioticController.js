const Bacteria = require('../schemas/Bacteria');
const Antibiotic = require('../schemas/Antibiotic');
const mongoose = require("mongoose");

const getAllAntibiotics = async (req, res) => {
  try {
    const antibiotics = await Antibiotic.find();
    res.status(200).json(antibiotics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAntibiotic = async (req, res) => {
  try {
    const antibiotic = await Antibiotic.findById(req.params.id)
      .populate("bacteriaKilled")
      .populate("bacteriaNotKilled");
    if (!antibiotic) {
      return res.status(404).json({ message: "Antibiotic not found" });
    }
    res.status(200).json(antibiotic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getAntibioticByName = async (req, res) => {
  try {
    const antibiotic = await Antibiotic.findOne({ name: req.params.name })
      .populate("bacteriaKilled")
      .populate("bacteriaNotKilled");
    if (!antibiotic) {
      return res.status(404).json({ message: "Antibiotic not found" });
    }
    res.status(200).json(antibiotic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addAntibiotic = async (req, res) => {
  let {
    name,
    laktam,
    group,
    trivia,
    bacteriaKilled,
    bacteriaNotKilled,
    dosage,
    observandum,
    baktericid
  } = req.body;

  
  const newAntibiotic = new Antibiotic({
    name,
    laktam,
    group,
    trivia,
    bacteriaKilled,
    bacteriaNotKilled,
    dosage,
    observandum,
    baktericid
  });

  try {
    const savedAntibiotic = await newAntibiotic.save();
    res.status(201).json(savedAntibiotic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateAntibiotic = async (req, res) => {
  try {
    const updatedAntibiotic = await Antibiotic.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAntibiotic) {
      return res.status(404).json({ message: "Antibiotic not found" });
    }
    res.status(200).json(updatedAntibiotic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllAntibiotics,
  getAntibiotic,
  getAntibioticByName,
  addAntibiotic,
  updateAntibiotic
};