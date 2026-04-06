const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = process.cwd();
const TEMP_DIR = path.join(ROOT, 'tmp_md_test');
const DOCS_DIR = path.join(ROOT, 'docs');

beforeAll(() => {
  if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR);
  fs.writeFileSync(path.join(TEMP_DIR, 'a.md'), '# A');
  fs.mkdirSync(path.join(TEMP_DIR, 'sub'));
  fs.writeFileSync(path.join(TEMP_DIR, 'sub', 'b.md'), '[link](../a.md)');
});

afterAll(() => {
  execSync(`rm -rf ${TEMP_DIR} ${path.join(DOCS_DIR, 'a.md')} ${path.join(DOCS_DIR, 'b.md')}`);
});

test('move-md-to-docs moves files', () => {
  execSync('node scripts/move-md-to-docs.js');
  expect(fs.existsSync(path.join(DOCS_DIR, 'a.md'))).toBe(true);
  expect(fs.existsSync(path.join(DOCS_DIR, 'b.md'))).toBe(true);
});

test('move-md-to-docs normalizes links', () => {
  const content = fs.readFileSync(path.join(DOCS_DIR, 'b.md'), 'utf8');
  expect(content).toContain('[link](a.md)');
});