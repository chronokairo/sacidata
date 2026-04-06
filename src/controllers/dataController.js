const DataModel = require('../models/dataModel');

exports.getData = async (req, res) => {
    try {
        const data = await DataModel.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar dados' });
    }
};