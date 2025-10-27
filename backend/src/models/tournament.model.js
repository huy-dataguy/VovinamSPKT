const mongoose = require('mongoose');

const TournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  location: { type: String },
  organizer: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Tournament', TournamentSchema);
