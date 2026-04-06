const fs = require('fs').promises;
const path = require('path');

const ROOT = process.cwd();
const DOCS_DIR = path.join(ROOT, 'docs');

async function findMdFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'docs') continue;
      files.push(...await findMdFiles(full));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      files.push(full);
    }
  }
  return files;
}

async function ensureDocs() {
  await fs.mkdir(DOCS_DIR, { recursive: true });
}

async function moveFiles(mdFiles) {
  for (const file of mdFiles) {
    const basename = path.basename(file);
    const dest = path.join(DOCS_DIR, basename);
    const content = await fs.readFile(file, 'utf8');
    await fs.writeFile(dest, content, 'utf8');
    await fs.unlink(file);
    console.log(`Moved: ${file} -> ${dest}`);
  }
}

(async () => {
  await ensureDocs();
  const mdFiles = await findMdFiles(ROOT);
  await moveFiles(mdFiles);
})();