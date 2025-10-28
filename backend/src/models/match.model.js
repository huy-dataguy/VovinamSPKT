const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  tournamentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament', required: true },
  fighters: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Fighter', required: true },
  ],
  gender: { type: String, enum: ['Nam', 'Nữ'] },
  weightClass: { type: String },
  result: {
    winner: { type: String, enum: ['Đỏ', 'Xanh'] }, // chỉ lưu màu giáp thắng
  },
}, { timestamps: true });

module.exports = mongoose.model('Match', MatchSchema);
