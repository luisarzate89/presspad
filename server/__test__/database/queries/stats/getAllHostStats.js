const mongoose = require('mongoose');

const buildDB = require('../../../database/data/test');

const {
  getAllHostStats,
} = require('../../../database/queries/stats/getAllHostStats');

describe('Test get all host stats query', () => {
  beforeAll(async done => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test('Test get stats', async done => {
    getAllHostStats().then(response => {
      expect(response).toBeDefined();
      expect(response[0].internsHosted).toBeDefined();
      expect(response[0].name).toBeDefined();
      expect(response[0].profile[0].verified).toBeDefined();
      done();
    });
  });
});
