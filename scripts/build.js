// Script de build: gera a pasta dist com assets e config.js
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

function numberEnv(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function copyFile(src, dest) {
  await ensureDir(path.dirname(dest));
  await fs.promises.copyFile(src, dest);
}

async function copyRecursive(src, dest) {
  // Node 16+ has fs.cp, use it if available
  if (fs.promises.cp) {
    await fs.promises.cp(src, dest, { recursive: true });
    return;
  }
  const stat = await fs.promises.stat(src);
  if (stat.isDirectory()) {
    await ensureDir(dest);
    const entries = await fs.promises.readdir(src);
    for (const e of entries) {
      await copyRecursive(path.join(src, e), path.join(dest, e));
    }
  } else {
    await copyFile(src, dest);
  }
}

async function build() {
  try {
    // clean dist
    if (fs.existsSync(DIST)) {
      await fs.promises.rm(DIST, { recursive: true, force: true });
    }
    await ensureDir(DIST);

    // Copy root static files
    const assets = ['index.html', 'script.js', 'style.css'];
    for (const a of assets) {
      const src = path.join(ROOT, a);
      if (fs.existsSync(src)) {
        await copyFile(src, path.join(DIST, a));
      }
    }

    // Copy public folder if exists
    const publicSrc = path.join(ROOT, 'public');
    if (fs.existsSync(publicSrc)) {
      await copyRecursive(publicSrc, path.join(DIST, 'public'));
    }

    // Generate config.js based on env
    const config = {
      appName: process.env.APP_NAME || 'SACI – Sistema de Avaliação da Qualidade dos Igarapés',
      port: numberEnv(process.env.PORT, 3000),
      mapCenter: [
        numberEnv(process.env.MAP_CENTER_LAT, -3.119),
        numberEnv(process.env.MAP_CENTER_LNG, -60.021)
      ],
      mapZoom: numberEnv(process.env.MAP_ZOOM, 12),
      tileUrl: process.env.TILE_URL || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      tileAttribution: process.env.TILE_ATTRIBUTION || '&copy; OpenStreetMap contributors'
    };

    const configFile = `window.SACIDATA_CONFIG = ${JSON.stringify(config, null, 2)};\n`;
    await fs.promises.writeFile(path.join(DIST, 'config.js'), configFile, 'utf8');

    console.log('Build do projeto SACIDATA concluído com sucesso. Dist gerado em:', DIST);
  } catch (err) {
    console.error('Erro no build:', err);
    process.exit(1);
  }
}

build();
