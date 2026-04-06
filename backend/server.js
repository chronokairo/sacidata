// Entry point do backend (Express)
const express = require('express');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';
const ROOT_DIR = __dirname;

// Security headers middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// API endpoints
const dataController = require('./controllers/dataController');
app.get('/api/data', dataController.getData);
app.post('/api/data', express.json(), dataController.createData);

// Healthcheck
app.get('/healthz', (req, res) => {
  res.json({ status: 'ok', service: 'sacidata', timestamp: new Date().toISOString() });
});

// Static files (frontend build)
app.use(express.static(path.join(ROOT_DIR, '../frontend/public')));

// SPA fallback
app.get('*', (req, res) => {
  const indexPath = path.join(ROOT_DIR, '../frontend/public/index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Not Found');
  }
});

app.listen(PORT, HOST, () => {
  console.log(`sacidata (Express) rodando em http://${HOST}:${PORT}`);
});
