const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: Number, required: true }
});

module.exports = mongoose.model('Data', dataSchema);