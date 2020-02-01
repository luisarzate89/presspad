const mongoose = require('mongoose');

const buildDB = require('../../../database/data/test/index');

// get query
const { updatePaidInstallment } = require('../../../database/queries/payments');

// get models
const User = require('../../../database/models/User');
const InternalTransaction = require('../../../database/models/InternalTransaction');
const Installment = require('../../../database/models/Installment');

describe('Tests for updatePaidInstallment queries', () => {
  beforeAll(async done => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(async done => {
    await mongoose.disconnect();
    done();
  });

  test('Test updatePaidInstallment', async done => {
    const [installment] = await Installment.find({ transaction: null });

    const { host: hostId, intern: internId, amount, booking } = installment;
    const [intern] = await User.find({ _id: internId });
    const [host] = await User.find({ _id: hostId });

    const internalTransaction = await InternalTransaction.create({
      user: internId,
      from: intern.account,
      to: host.account,
      amount,
      type: 'installment',
    });
    const result = await updatePaidInstallment(
      installment._id,
      internalTransaction._id,
      booking,
      amount,
    );

    const [updatedInstallment] = await Installment.find({
      _id: installment._id,
    });

    expect(result).toBeDefined();
    expect(updatedInstallment.transaction.toString()).toBe(
      internalTransaction._id.toString(),
    );
    done();
  });
});
