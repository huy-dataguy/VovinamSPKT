const mongoose = require('mongoose');

const FighterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ['Nam', 'Nữ'], required: true },
  weight: { type: Number, required: true },
  belt: { type: String, required: true },
  club: { type: String },
  birthYear: { type: Number },
  joinDate: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Fighter', FighterSchema);
