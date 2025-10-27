// controllers/tournament.controller.js

const Tournament = require('../models/tournament.model');

const getAllTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find().sort({ year: -1, month: -1 });
    res.json(tournaments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addTournament = async (req, res) => {
  try {
    const tournament = new Tournament(req.body);
    await tournament.save();
    res.status(201).json(tournament);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllTournaments,
  addTournament,
};
