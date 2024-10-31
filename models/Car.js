const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  model: { type: String, required: true },
  weeklyRate: { type: Number, required: true },
});

module.exports = mongoose.model('Car', carSchema);
