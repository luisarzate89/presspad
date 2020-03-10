const request = require('supertest');

const app = require('../../../app');
const {
  Account,
  Installment,
  InternalTransaction,
  ExternalTransaction,
} = require('../../../database/models');

const buildDb = require('../../../database/data/test');
const createToken = require('./../../../helpers/createToken');
const {
  API_INTERN_PAYMENT_URL,
} = require('./../../../../client/src/constants/apiRoutes');
const { paymentMethod } = require('./mockData');

describe('Testing Intern payemnts (Pay old installment):', () => {
  const couponInfo = {
    couponCode: '',
    discountDays: 0,
    discountRate: 0,
    couponDiscount: 0,
  };

  test('pay old installment', async done => {
    const {
      connection,
      mongoServer,
      bookings,
      installments,
      accounts,
      users,
    } = await buildDb({
      replSet: true,
    });

    const { internUser } = users;
    const token = `token=${createToken(internUser._id)}`;

    const { _id } = bookings.confirmedPaidFirst;
    const bookingId = _id;
    const paymentInfo = installments.secondUnpaidPayment;

    const data = {
      bookingId,
      couponInfo,
      paymentInfo,
      paymentMethod,
    };

    request(app)
      .post(API_INTERN_PAYMENT_URL)
      .send(data)
      .set('Cookie', [token])
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (err, res) => {
        if (err) {
          await connection.close();
          await mongoServer.stop();
          return done(err);
        }

        expect(res).toBeDefined();
        expect(res.body.success).toBeTruthy();

        const payAmount = paymentInfo.amount;
        // Intern account checks
        const {
          _id: internAccountId,
          income: oldInternIncom,
          currentBalance: oldInternCurrentBalance,
        } = accounts.internAccount;

        const {
          income: internIncom,
          currentBalance: internCurrentBalance,
        } = await Account.findById(internAccountId);

        expect(internIncom - oldInternIncom).toBe(payAmount);
        expect(oldInternCurrentBalance).toBe(internCurrentBalance);

        // Host account checks
        const {
          _id: hostAccId,
          income: oldHostIncom,
          currentBalance: oldHostCurrentBalance,
        } = accounts.hostAccount;

        const {
          income: hostIncom,
          currentBalance: hostCurrentBalance,
        } = await Account.findById(hostAccId);

        expect(hostIncom - oldHostIncom).toBe(payAmount);
        expect(oldHostCurrentBalance + payAmount).toBe(hostCurrentBalance);

        // Presspad account checks
        const {
          _id: presspadAccId,
          income: oldPresspadIncom,
          currentBalance: oldPresspadCurrentBalance,
        } = accounts.presspadAccount;

        const {
          income: presspadIncom,
          currentBalance: presspadCurrentBalance,
        } = await Account.findById(presspadAccId);

        expect(presspadIncom - oldPresspadIncom).toBe(payAmount);
        expect(oldPresspadCurrentBalance + payAmount).toBe(
          presspadCurrentBalance,
        );

        // Installments check
        const {
          amount: installmentAmount,
          transaction,
        } = await Installment.findById(paymentInfo._id);

        expect(installmentAmount).toBe(payAmount);

        // InternalTransaction check
        const {
          amount: internalTransactionAmount,
          type,
        } = await InternalTransaction.findById(transaction);

        expect(type).toBe('installment');
        expect(internalTransactionAmount).toBe(payAmount);

        // ExternalTransaction check
        const [
          { amount: exTransactionAmmount, type: exTransactionType },
        ] = await ExternalTransaction.find({
          account: internAccountId,
        })
          .limit(1)
          .sort({ $natural: -1 });

        expect(exTransactionAmmount).toBe(payAmount);
        expect(exTransactionType).toBe('deposite');

        await connection.close();
        await mongoServer.stop();
        return done();
      });
  }, 20000);

  test('pay old installment - invalid price', async done => {
    const {
      connection,
      mongoServer,
      bookings,
      installments,
      accounts,
      users,
    } = await buildDb({
      replSet: true,
    });

    const { internUser } = users;
    const token = `token=${createToken(internUser._id)}`;
    const { _id } = bookings.confirmedPaidFirst;
    const bookingId = _id;
    const paymentInfo = installments.secondUnpaidPayment;

    paymentInfo.amount = 0;

    const data = {
      bookingId,
      couponInfo,
      paymentInfo,
      paymentMethod,
    };

    request(app)
      .post(API_INTERN_PAYMENT_URL)
      .send(data)
      .set('Cookie', [token])
      .expect('Content-Type', /json/)
      .expect(422)
      .end(async (err, res) => {
        if (err) {
          await connection.close();
          await mongoServer.stop();
          return done(err);
        }

        expect(res).toBeDefined();
        expect(res.body.error).toBe('bad amount info');

        // Intern account checks
        const {
          _id: internAccountId,
          income: oldInternIncom,
        } = accounts.internAccount;

        const { income: internIncom } = await Account.findById(internAccountId);

        expect(internIncom).toBe(oldInternIncom);

        // Host account checks
        const {
          _id: hostAccountId,
          income: oldHostIncom,
          currentBalance: oldHostCurrentBalance,
        } = accounts.hostAccount;

        const {
          income: hostIncom,
          currentBalance: hostCurrentBalance,
        } = await Account.findById(hostAccountId);

        expect(hostIncom).toBe(oldHostIncom);
        expect(oldHostCurrentBalance).toBe(hostCurrentBalance);

        // Presspad account checks
        const {
          _id: presspadAccountId,
          income: oldPresspadIncom,
          currentBalance: oldPresspadCurrentBalance,
        } = accounts.presspadAccount;

        const {
          income: presspadIncom,
          currentBalance: presspadCurrentBalance,
        } = await Account.findById(presspadAccountId);

        expect(presspadIncom).toBe(oldPresspadIncom);
        expect(oldPresspadCurrentBalance).toBe(presspadCurrentBalance);

        // Installments check
        const { transaction } = await Installment.findById(paymentInfo._id);

        expect(transaction).toBeUndefined();

        await connection.close();
        await mongoServer.stop();
        return done();
      });
  }, 20000);
});
