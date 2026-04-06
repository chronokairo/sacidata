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

async function uniqueDest(basename) {
  let dest = path.join(DOCS_DIR, basename);
  let i = 1;
  const ext = path.extname(basename);
  const name = path.basename(basename, ext);
  while (true) {
    try {
      await fs.access(dest);
      dest = path.join(DOCS_DIR, `${name}-${i}${ext}`);
      i += 1;
    } catch {
      break;
    }
  }
  return dest;
}

async function moveFiles(mdFiles) {
  for (const file of mdFiles) {
    const basename = path.basename(file);
    const dest = await uniqueDest(basename);
    const content = await fs.readFile(file, 'utf8');
    await fs.writeFile(dest, content, 'utf8');
    await fs.unlink(file);
    console.log(`Moved: ${file} -> ${dest}`);
  }
}

async function normalizeLinks() {
  const docsFiles = await fs.readdir(DOCS_DIR);
  const mdFiles = docsFiles.filter(f => f.toLowerCase().endsWith('.md'));
  const mdSet = new Set(mdFiles);

  for (const md of mdFiles) {
    const full = path.join(DOCS_DIR, md);
    let content = await fs.readFile(full, 'utf8');

    content = content.replace(/\[([^\]]+)\]\((?:\.\/|\.\.\/|\/)??([^)\s]+\.md)(#[^)]*)?\)/g, (m, text, target, anchor) => {
      const targetBasename = path.basename(target);
      if (mdSet.has(targetBasename)) {
        return `[${text}](${targetBasename}${anchor || ''})`;
      }
      return m;
    });

    await fs.writeFile(full, content, 'utf8');
  }
}

async function verifyNoMdOutsideDocs() {
  const mdFiles = await findMdFiles(ROOT);
  if (mdFiles.length === 0) {
    console.log('Verificação: nenhum .md fora de docs');
  } else {
    console.warn('Aviso: ainda existem arquivos .md fora de docs:');
    mdFiles.forEach(f => console.warn(` - ${f}`));
    process.exitCode = 2;
  }
}

(async () => {
  try {
    console.log('Iniciando movimentação de .md para /docs');
    await ensureDocs();
    const mdFiles = await findMdFiles(ROOT);
    if (mdFiles.length === 0) {
      console.log('Nenhum arquivo .md encontrado fora de docs. Nada a fazer.');
      return;
    }
    await moveFiles(mdFiles);
    await normalizeLinks();
    await verifyNoMdOutsideDocs();
    console.log('Concluído. Todos os .md foram movidos para /docs');
  } catch (err) {
    console.error('Erro:', err);
    process.exit(1);
  }
})();