// Mock global fetch
global.fetch = jest.fn();

import { fetchData } from '../../../src/services/api.js';

describe('API Service - Unit Tests', () => {
  
  beforeEach(() => {
    fetch.mockClear();
  });

  describe('fetchData', () => {
    it('deve retornar dados quando a resposta é ok', async () => {
      const mockData = [
        { id: '1', name: 'Test', value: 100 }
      ];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      const result = await fetchData();

      expect(result).toEqual(mockData);
      expect(fetch).toHaveBeenCalledWith('/api/data');
    });

    it('deve lançar erro quando a resposta não é ok', async () => {
      fetch.mockResolvedValueOnce({
        ok: false
      });

      await expect(fetchData()).rejects.toThrow('Erro ao buscar dados');
    });

    it('deve fazer chamada para o endpoint correto', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => []
      });

      await fetchData();

      expect(fetch).toHaveBeenCalledWith('/api/data');
    });

    it('deve lançar erro se fetch falhar', async () => {
      const fetchError = new Error('Network error');
      fetch.mockRejectedValueOnce(fetchError);

      await expect(fetchData()).rejects.toThrow('Network error');
    });
  });
});
