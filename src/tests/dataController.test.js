const request = require('supertest');
const app = require('../index');

describe('GET /api/data', () => {
    it('deve retornar dados com status 200', async () => {
        const res = await request(app).get('/api/data');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});