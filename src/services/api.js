export async function fetchData() {
  // Usa fetch para permitir mocks nos testes
  const res = await fetch('/api/data');
  if (!res.ok) throw new Error('Erro ao buscar dados');
  return res.json();
}
