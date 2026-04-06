const request = require('supertest');
const app = require('../index');

describe('Data Controller', () => {
  it('should fetch data', async () => {
    const res = await request(app).get('/api/data');
    expect(res.statusCode).toEqual(200);
  });

  it('should create data', async () => {
    const res = await request(app)
      .post('/api/data')
      .send({ name: 'Igarapé do Mindu', status: 'monitorado', score: 7.5 });
    expect(res.statusCode).toEqual(201);
  });
});