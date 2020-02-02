const mongoose = require('mongoose');

const User = require('../../../database/models/User');
const WithdrawRequest = require('../../../database/models/WithdrawRequest');
const buildDB = require('../../../database/data/test');

describe('Test WithdrawRequest schema', () => {
  beforeAll(async done => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test('WithdrawRequest schema should be defined', async () => {
    expect(WithdrawRequest).toBeDefined();
  });

  test('should store WithdrawRequest schema correctly', async done => {
    const withdrawRequest = await WithdrawRequest.find();
    expect(withdrawRequest).toHaveLength(4);
    done();
  });

  test('should store a new WithdrawRequest correctly', async done => {
    const host1 = await User.findOne({ role: 'host' });
    const newWithdrawRequest = {
      user: host1._id,
      account: host1.account,
      amount: 500,
      bankName: 'bankName',
      bankSortCode: 'bankSortCode',
      accountNumber: 'accountNumber',
    };

    const storedWithdrawRequest = await WithdrawRequest.create(
      newWithdrawRequest,
    );
    expect(storedWithdrawRequest).toBeDefined();
    expect(storedWithdrawRequest.bankName).toBe('bankName');
    expect(storedWithdrawRequest.status).toBe('pending');
    done();
  });
});
