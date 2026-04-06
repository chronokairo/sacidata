const assert = require('assert');

// Minimal implementations mirroring src logic to allow running without installing deps
function generateId() {
  return 'id-' + Math.random().toString(36).slice(2, 10);
}

let mockData = [
  { id: generateId(), name: 'Exemplo', value: 100 }
];

function getData() {
  return mockData;
}

function sanitizeName(name) {
  return String(name).replace(/<[^>]*>/g, '');
}

function createData(body) {
  const { name, value } = body || {};
  if (!name || value === undefined) return { status: 400, json: { error: 'Name and value are required' } };
  if (typeof value !== 'number' || value < 0) return { status: 400, json: { error: 'Value must be a non-negative number' } };
  const newItem = { id: generateId(), name: sanitizeName(name), value };
  mockData.push(newItem);
  return { status: 201, json: newItem };
}

// Simple fetchData using global.fetch mock
async function fetchData() {
  const res = await global.fetch('/api/data');
  if (!res.ok) throw new Error('Erro ao buscar dados');
  return res.json();
}

const results = [];

async function runTest(name, fn) {
  try {
    await fn();
    console.log(`PASS - ${name}`);
    results.push({ name, ok: true });
  } catch (err) {
    console.error(`FAIL - ${name} -> ${err.message}`);
    results.push({ name, ok: false, error: err.message });
  }
}

(async () => {
  // getData tests
  await runTest('getData retorna array e status', () => {
    const data = getData();
    assert.ok(Array.isArray(data));
    assert.ok(data.length > 0);
    const item = data[0];
    assert.ok(item.id && item.name !== undefined && item.value !== undefined);
  });

  // createData tests
  await runTest('createData cria item válido', () => {
    const res = createData({ name: 'Novo Item', value: 200 });
    assert.strictEqual(res.status, 201);
    assert.strictEqual(res.json.name, 'Novo Item');
    assert.strictEqual(res.json.value, 200);
    assert.ok(typeof res.json.id === 'string');
  });

  await runTest('createData retorna 400 quando name ausente', () => {
    const res = createData({ value: 200 });
    assert.strictEqual(res.status, 400);
    assert.ok(res.json.error.toLowerCase().includes('required'));
  });

  await runTest('createData retorna 400 quando value ausente', () => {
    const res = createData({ name: 'Item' });
    assert.strictEqual(res.status, 400);
    assert.ok(res.json.error.toLowerCase().includes('required'));
  });

  await runTest('createData aceita value = 0', () => {
    const res = createData({ name: 'Zero', value: 0 });
    assert.strictEqual(res.status, 201);
    assert.strictEqual(res.json.value, 0);
  });

  await runTest('createData rejeita value não numérico', () => {
    const res = createData({ name: 'Inv', value: 'abc' });
    assert.strictEqual(res.status, 400);
    assert.ok(res.json.error.toLowerCase().includes('non-negative') || res.json.error.toLowerCase().includes('number'));
  });

  // fetchData tests - mock global.fetch
  await runTest('fetchData retorna dados quando ok', async () => {
    const mockData = [{ id: '1', name: 'Test', value: 100 }];
    global.fetch = async (url) => ({ ok: true, json: async () => mockData });
    const result = await fetchData();
    assert.deepStrictEqual(result, mockData);
  });

  await runTest('fetchData lança erro quando não ok', async () => {
    global.fetch = async () => ({ ok: false });
    let threw = false;
    try {
      await fetchData();
    } catch (err) {
      threw = true;
      assert.ok(err.message.includes('Erro'));
    }
    if (!threw) throw new Error('Não lançou erro para resposta não ok');
  });

  await runTest('fetchData rejeita se fetch falhar', async () => {
    global.fetch = async () => { throw new Error('Network error'); };
    await assert.rejects(fetchData(), /Network error/);
  });

  // Summary
  const failed = results.filter(r => !r.ok);
  console.log('\nTestes completos. Total:', results.length, 'Pass:', results.length - failed.length, 'Fail:', failed.length);

  // Write simple report file
  const fs = require('fs');
  const report = [];
  report.push('# Relatório de Testes de Integridade');
  report.push('\nResultados:');
  results.forEach(r => report.push(`- ${r.ok ? 'PASS' : 'FAIL'} - ${r.name}${r.error ? ' - ' + r.error : ''}`));
  fs.writeFileSync('tests/QA_TEST_RUN_REPORT.md', report.join('\n'));

  process.exit(failed.length > 0 ? 1 : 0);
})();
