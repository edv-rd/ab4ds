const Bacteria = require('../schemas/Bacteria');

const getBacteria = async (req, res) => {
  try {
    const bacteria = await Bacteria.find();
    res.status(200).json(bacteria);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addBacteria = async (req, res) => {
  try {
    const bacteria = new Bacteria(req.body);
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

module.exports = {
  getBacteria,
  addBacteria,
  updateBacteria
};