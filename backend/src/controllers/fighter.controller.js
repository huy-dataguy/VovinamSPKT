const Fighter = require('../models/fighter.model');

const getAllFighters = async (req, res) => {
  try {
    const fighters = await Fighter.find().sort({ createdAt: -1 });
    res.json(fighters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addFighter = async (req, res) => {
  try {
    const fighter = new Fighter(req.body);
    await fighter.save();
    res.status(201).json(fighter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllFighters,
  addFighter,
};
