const DataModel = require('../models/dataModel');

exports.getData = async (req, res) => {
    try {
        // Validação de entrada (exemplo: parâmetros de consulta)
        if (!req.query || Object.keys(req.query).length === 0) {
            return res.status(400).json({ message: 'Parâmetros inválidos' });
        }

        // Paginação
        const { page = 1, limit = 10 } = req.query;
        const data = await DataModel.find()
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar dados' });
    }
};