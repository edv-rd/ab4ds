const express = require('express');
const {
  getAllAntibiotics,
  addAntibiotic,
  updateAntibiotic,
  getAntibiotic,
  getAntibioticByName
} = require("../controllers/antibioticController");

const router = express.Router();

// Route to get all antibiotics
router.get("/", getAllAntibiotics);

// Route to add a new antibiotic
router.post("/", addAntibiotic);

router.get("/:id", getAntibiotic);

router.get("/find-by-name/:name", getAntibioticByName)

// Route to update an existing antibiotic
router.put("/:id", updateAntibiotic);

module.exports = router;
