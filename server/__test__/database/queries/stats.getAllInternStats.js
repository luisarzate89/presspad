const mongoose = require('mongoose');

const buildDB = require('../../../database/data/test');

const {
  getAllInternStats,
} = require('../../../database/queries/stats/getAllInternStats');

describe('Test get all client stats query', () => {
  beforeAll(async done => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test('Test get stats', async done => {
    getAllInternStats().then(response => {
      expect(response).toBeDefined();
      expect(response[0].name).toBeDefined();
      expect(response[0].totalPayments).toBeDefined();
      done();
    });
  });
});
