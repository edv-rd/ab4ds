const Bacteria = require('../schemas/Bacteria');
const Antibiotic = require('../schemas/Antibiotic');
const mongoose = require("mongoose");

const getAllBacteria = async (req, res) => {
  try {
    const bacteria = await Bacteria.find();
    res.status(200).json(bacteria);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBacteria = async (req, res) => {
  try {
    const bacteria = await Bacteria.findById(req.params.id)
      .populate("antibioticsSensitive")
      .populate("antibioticsResistent");
    if (!bacteria) {
      return res.status(404).json({ message: "Antibiotic not found" });
    }
    res.status(200).json(bacteria);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const addBacteria = async (req, res) => {
  let {
    name,
    gramStainPositive,
    shape,
    capsule,
    aerob,
    laktamasProducer,
    antibioticsSensitive,
    antibioticsResistent,
    extendedResistance,
    trivia,
  } = req.body;

  // Try to resolve antibiotic names to ObjectIds, fallback to string if not found
  

  
  try {
    const bacteria = new Bacteria({
      name,
      gramStainPositive,
      shape,
      capsule,
      aerob,
      laktamasProducer,
      antibioticsSensitive,
      antibioticsResistent,
      extendedResistance,
      trivia,
    });
    const savedBacteria = await bacteria.save();
    res.status(201).json(savedBacteria);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateBacteria = async (req, res) => {
  try {
    const updatedBacteria = await Bacteria.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBacteria) {
      return res.status(404).json({ message: "Bacteria not found" });
    }
    res.status(200).json(updatedBacteria);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getBacteriaByName = async (req, res) => {
  try {
    const bacteria = await Bacteria.findOne({ name: req.params.name });
    if (!bacteria) {
      return res.status(404).json({ message: "Bacteria not found" });
    }
    res.status(200).json(bacteria);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBacteria,
  getAllBacteria,
  addBacteria,
  updateBacteria,
  getBacteriaByName
};