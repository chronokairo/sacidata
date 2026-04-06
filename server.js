const express = require('express');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';
const ROOT_DIR = __dirname;

function numberEnv(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function buildConfig() {
  return {
    appName: process.env.APP_NAME || 'SACI – Sistema de Avaliação da Qualidade dos Igarapés',
    port: PORT,
    mapCenter: [
      numberEnv(process.env.MAP_CENTER_LAT, -3.119),
      numberEnv(process.env.MAP_CENTER_LNG, -60.021)
    ],
    mapZoom: numberEnv(process.env.MAP_ZOOM, 12),
    tileUrl: process.env.TILE_URL || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    tileAttribution: process.env.TILE_ATTRIBUTION || '&copy; OpenStreetMap contributors'
  };
}

// Security headers middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Cache control for static assets (1 hour)
const staticOptions = {
  maxAge: '1h',
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
};

// Config endpoint
app.get('/config.js', (req, res) => {
  res.type('application/javascript');
  res.send(`window.SACIDATA_CONFIG = ${JSON.stringify(buildConfig(), null, 2)};`);
});

// Healthcheck
app.get('/healthz', (req, res) => {
  res.json({ status: 'ok', service: 'sacidata', timestamp: new Date().toISOString() });
});

// API Mocks / Implementation
app.get('/api/igarapes', (req, res) => {
  res.json([
    { id: 1, name: 'Igarapé do Mindu', status: 'monitorado', score: 7.5 },
    { id: 2, name: 'Igarapé da 40', status: 'alerta', score: 4.2 }
  ]);
});

// Static files from root (for backward compatibility if needed)
app.use(express.static(ROOT_DIR, staticOptions));

// SPA fallback
app.get('*', (req, res) => {
  const indexPath = path.join(ROOT_DIR, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Not Found');
  }
});

app.listen(PORT, HOST, () => {
  console.log(`sacidata (Express) rodando em http://${HOST}:${PORT}`);
});
