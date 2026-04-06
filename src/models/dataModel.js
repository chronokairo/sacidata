const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
  score: { type: Number, required: true }
});

module.exports = mongoose.model('Data', dataSchema);