const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  tournamentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament', required: true },
  fighters: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Fighter', required: true },
  ],
  gender: { type: String, enum: ['Nam', 'Nữ'] },
  weightClass: { type: String },
  result: {
    winner: { type: mongoose.Schema.Types.ObjectId, ref: 'Fighter' },
    score: { type: String },
    method: { type: String },
  },
}, { timestamps: true });

module.exports = mongoose.model('Match', MatchSchema);
