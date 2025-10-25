const Fighter = require('../models/fighter.model');

const createFighter = async (req, res, next) => {
  try {
    const { name, weight, belt } = req.body;
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const fighter = await Fighter.create({ name, weight, belt, month, year });
    res.status(201).json(fighter);
  } catch (err) {
    next(err);
  }
};

const getFighters = async (req, res, next) => {
  try {
    const fighters = await Fighter.find().sort({ createdAt: -1 });
    res.json(fighters);
  } catch (err) {
    next(err);
  }
};

module.exports = { createFighter, getFighters };
