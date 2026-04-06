const mongoose = require('mongoose');
const Data = require('../models/dataModel');

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/test');
});

test('create & save data successfully', async () => {
    const data = new Data({ name: 'Test', value: 100 });
    const savedData = await data.save();
    expect(savedData._id).toBeDefined();
});

afterAll(async () => {
    await mongoose.connection.close();
});