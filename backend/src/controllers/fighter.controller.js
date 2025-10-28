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

const updateFighter = async (req, res) => {
  try {
    const fighter = await Fighter.findById(req.params.id);
    if (!fighter) return res.status(404).json({ message: 'Không tìm thấy võ sinh' });

    Object.assign(fighter, req.body); 
    await fighter.save();
    res.json(fighter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteFighter = async (req, res) => {
  try {
    const fighter = await Fighter.findById(req.params.id);
    if (!fighter) return res.status(404).json({ message: 'Không tìm thấy võ sinh' });

    await fighter.deleteOne();
    res.json({ message: 'Đã xóa võ sinh thành công' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllFighters,
  addFighter,
  updateFighter,
  deleteFighter,
};
