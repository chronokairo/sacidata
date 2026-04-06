const dataController = require('../../../src/api/controllers/dataController');
const { v4: uuidv4 } = require('uuid');

describe('dataController - Unit Tests', () => {
  describe('getData', () => {
    it('deve retornar um array de dados com status 200', () => {
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      dataController.getData(null, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(expect.any(Array));
    });

    it('deve retornar pelo menos um item de dados padrão', () => {
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      dataController.getData(null, mockRes);
      const callArg = mockRes.json.mock.calls[0][0];

      expect(callArg.length).toBeGreaterThan(0);
      expect(callArg[0]).toHaveProperty('id');
      expect(callArg[0]).toHaveProperty('name');
      expect(callArg[0]).toHaveProperty('value');
    });
  });

  describe('createData', () => {
    it('deve criar um novo item com dados válidos', () => {
      const mockReq = {
        body: {
          name: 'Novo Item',
          value: 200
        }
      };

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      dataController.createData(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Novo Item',
          value: 200,
          id: expect.any(String)
        })
      );
    });

    it('deve retornar erro 400 quando name está faltando', () => {
      const mockReq = {
        body: {
          value: 200
        }
      };

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      dataController.createData(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.stringContaining('required')
        })
      );
    });

    it('deve retornar erro 400 quando value está faltando', () => {
      const mockReq = {
        body: {
          name: 'Item sem value'
        }
      };

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      dataController.createData(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.stringContaining('required')
        })
      );
    });

    it('deve aceitar value igual a 0', () => {
      const mockReq = {
        body: {
          name: 'Item com value zero',
          value: 0
        }
      };

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      dataController.createData(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Item com value zero',
          value: 0,
          id: expect.any(String)
        })
      );
    });

    it('deve rejeitar value não numérico', () => {
      const mockReq = {
        body: {
          name: 'Item inválido',
          value: 'string'
        }
      };

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      dataController.createData(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.stringContaining('non-negative number')
        })
      );
    });
  });
});