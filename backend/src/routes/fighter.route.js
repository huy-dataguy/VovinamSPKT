const express = require("express");
const router = express.Router();
const { addFighter, getAllFighters } = require("../controllers/fighter.controller");

router.post("/register", addFighter);

router.get("/", getAllFighters);

module.exports = router;
