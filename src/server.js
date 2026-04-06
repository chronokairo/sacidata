const express = require('express');
const app = express();
const config = require('../config/config');

app.get('/', (req, res) => {
  res.send('SACI Data API');
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});