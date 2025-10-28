const express = require("express");
const router = express.Router();
const {
  getAllFighters,
  addFighter,
  updateFighter,
  deleteFighter,
} = require('../controllers/fighter.controller');
router.post("/register", addFighter);

router.get("/", getAllFighters);
router.put('/:id', updateFighter);
router.delete('/:id', deleteFighter);
module.exports = router;
