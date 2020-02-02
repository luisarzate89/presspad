const mongoose = require('mongoose');

const User = require('../../../database/models/User');
const Transaction = require('../../../database/models/Transaction');
const buildDB = require('../../../database/data/test');

describe('Test Transaction schema', () => {
  beforeAll(async done => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test('Transaction schema should be defined', async () => {
    expect(Transaction).toBeDefined();
  });

  test('should store Listing schema correctly', async done => {
    const transactions = await Transaction.find();
    expect(transactions.length).toBeGreaterThan(1);
    done();
  });

  test('should store a new Transaction correctly', async done => {
    const org = await User.findOne({ role: 'organisation' });
    const intern = await User.findOne({ role: 'intern' });

    const newTransaction = {
      credits: 500,
      sender: org,
      recipient: intern,
    };
    const storedTransaction = await Transaction.create(newTransaction);
    expect(storedTransaction).toBeDefined();
    expect(storedTransaction.credits).toBe(newTransaction.credits);
    done();
  });
});
