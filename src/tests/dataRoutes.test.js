const request = require('supertest');
const app = require('../app');

describe('GET /data', () => {
    it('should return 200 and an array', async () => {
        const res = await request(app).get('/data');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});