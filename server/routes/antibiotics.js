const express = require('express');
const {
  getAllAntibiotics,
  addAntibiotic,
  updateAntibiotic,
} = require("../controllers/antibioticController");

const router = express.Router();

// Route to get all antibiotics
router.get("/", getAllAntibiotics);

// Route to add a new antibiotic
router.post("/", addAntibiotic);

// Route to update an existing antibiotic
router.put("/:id", updateAntibiotic);

module.exports = router;
