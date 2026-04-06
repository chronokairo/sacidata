const DataModel = require('../models/dataModel');

exports.getData = async (req, res) => {
  try {
    const data = await DataModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createData = async (req, res) => {
  const data = new DataModel(req.body);
  try {
    const savedData = await data.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};