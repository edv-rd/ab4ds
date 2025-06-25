const Bacteria = require('../schemas/Bacteria');
const Antibiotic = require('../schemas/Antibiotic');
const mongoose = require("mongoose");

const getBacteria = async (req, res) => {
  try {
    const bacteria = await Bacteria.find();
    res.status(200).json(bacteria);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
  const resolveAntibiotics = async (arr) => {
    return Promise.all(
      (arr || []).map(async (antib) => {
        // Try to find by name first
        let found = await Antibiotic.findOne({ name: antib });
        // If not found and antib is a valid ObjectId, try by ID
        if (!found && mongoose.Types.ObjectId.isValid(antib)) {
          found = await Antibiotic.findById(antib);
        }
        return found ? found._id : null; // return null if not found or empty
      })
    );
  };

  antibioticsSensitive = (await resolveAntibiotics(antibioticsSensitive)).filter(
    (id) => id && mongoose.Types.ObjectId.isValid(id)
  );
  antibioticsResistent = (await resolveAntibiotics(antibioticsResistent)).filter(
    (id) => id && mongoose.Types.ObjectId.isValid(id)
  );

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
  addBacteria,
  updateBacteria,
  getBacteriaByName
};