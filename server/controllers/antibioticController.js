const Antibiotic = require('../schemas/Antibiotic');

const getAllAntibiotics = async (req, res) => {
  try {
    const antibiotics = await Antibiotic.find();
    res.status(200).json(antibiotics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addAntibiotic = async (req, res) => {
  const { name, group, bacteria } = req.body;

  const newAntibiotic = new Antibiotic({
    name,
    group,
    bacteria,
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
  addAntibiotic,
  updateAntibiotic
};