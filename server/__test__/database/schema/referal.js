const mongoose = require('mongoose');

const User = require('../../../database/models/User');
const Referal = require('../../../database/models/Referal');
const buildDB = require('../../../database/data/test');

describe('Test Referal schema', () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test('Referal schema should be defined', async () => {
    expect(Referal).toBeDefined();
  });

  test('should store Referal schema correctly', async done => {
    const referrals = await Referal.find();
    expect(referrals).toHaveLength(3);
    done();
  });

  test('should store a new Referal correctly', async done => {
    const superhost = await User.find({ role: 'superhost' });
    const hosts = await User.find({ role: 'host' });

    const newReferal = {
      referred: hosts[2],
      referrer: superhost[0],
    };

    const storedReferal = await Referal.create(newReferal);
    expect(storedReferal).toBeDefined();
    expect(storedReferal.referred).toBe(newReferal.referred);
    done();
  });
});
