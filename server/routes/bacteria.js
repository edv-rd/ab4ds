const { Router } = require("express");
const {
  getBacteria,
  addBacteria,
  updateBacteria,
} = require("../controllers/bacteriaController");

const router = Router();

// Route to get all bacteria
router.get("/", getBacteria);

// Route to add a new bacteria
router.post("/", addBacteria);

// Route to update an existing bacteria
router.put("/:id", updateBacteria);

module.exports = router;
