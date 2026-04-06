// Arquivo de configuração do servidor
const express = require('express');
const mongoose = require('mongoose');
const dataRoutes = require('./routes/dataRoutes');

const app = express();
app.use(express.json());
app.use('/api/data', dataRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});