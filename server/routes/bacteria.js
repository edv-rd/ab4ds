const express = require('express');
const {
  getBacteria,
  addBacteria,
  updateBacteria,
  getBacteriaByName
} = require("../controllers/bacteriaController");

const router = express.Router();

// Route to get all bacteria
router.get("/", getBacteria);

// Route to add a new bacteria
router.post("/", addBacteria);

// Route to get bacteria by name
router.get("/find-by-name/:name", getBacteriaByName); // <-- Add this line!

// Route to update an existing bacteria
router.put("/:id", updateBacteria);

module.exports = router;
