const mongoose =  require('mongoose');

const fighterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true },
  belt: { type: String, required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Fighter", fighterSchema);
