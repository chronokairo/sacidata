// src/services/api.js
export async function fetchData() {
  // Simulação de chamada à API
  return Promise.resolve([
    { id: 1, name: 'Igarapé 1', value: 'Bom' },
    { id: 2, name: 'Igarapé 2', value: 'Regular' },
    { id: 3, name: 'Igarapé 3', value: 'Ruim' }
  ]);
}
