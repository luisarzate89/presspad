const request = require('supertest');
const moment = require('moment');

const app = require('../../../app');
const {
  Account,
  Installment,
  InternalTransaction,
  ExternalTransaction,
} = require('../../../database/models');
const createToken = require('./../../../helpers/createToken');
const buildDb = require('../../../database/data/test');
const {
  API_INTERN_PAYMENT_URL,
} = require('./../../../../client/src/constants/apiRoutes');
const { paymentMethod } = require('./mockData');

describe('Testing Intern payemnts (Pay upfront):', () => {
  const couponInfo = {
    couponCode: '',
    discountDays: 0,
    discountRate: 0,
    couponDiscount: 0,
  };

  test('new installments pay up front', async done => {
    const {
      connection,
      mongoServer,
      bookings,
      accounts,
      users,
    } = await buildDb({
      replSet: true,
    });

    const { internUser } = users;
    const token = `token=${createToken(internUser._id)}`;
    const booking = bookings.confirmedNotPaid;
    const { _id: bookingId, price } = booking;

    const paymentInfo = {
      key: 1,
      dueDate: moment(booking.startDate).subtract(7, 'day'),
      amount: price,
    };

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

        expect(internIncom - oldInternIncom).toBe(price);
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

        expect(hostIncom - oldHostIncom).toBe(price);
        expect(oldHostCurrentBalance + price).toBe(hostCurrentBalance);

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

        expect(presspadIncom - oldPresspadIncom).toBe(price);
        expect(oldPresspadCurrentBalance + price).toBe(presspadCurrentBalance);

        // Installments check
        const [
          { amount: installmentAmount, transaction },
        ] = await Installment.find({
          booking: bookingId,
        });

        expect(installmentAmount).toBe(price);

        // InternalTransaction check
        const {
          amount: internalTransactionAmount,
          type,
        } = await InternalTransaction.findById(transaction);

        expect(type).toBe('installment');
        expect(internalTransactionAmount).toBe(price);

        // ExternalTransaction check

        const [
          { amount: exTransactionAmmount, type: exTransactionType },
        ] = await ExternalTransaction.find({
          account: internAccountId,
        })
          .limit(1)
          .sort({ $natural: -1 });

        expect(exTransactionAmmount).toBe(price);
        expect(exTransactionType).toBe('deposite');

        await connection.close();
        await mongoServer.stop();
        return done();
      });
  }, 20000);

  test('new installments pay up front - invalid price', async done => {
    const {
      connection,
      mongoServer,
      bookings,
      accounts,
      users,
    } = await buildDb({
      replSet: true,
    });

    const { internUser } = users;
    const token = `token=${createToken(internUser._id)}`;
    const booking = bookings.confirmedNotPaid;
    const bookingId = booking._id;

    const paymentInfo = {
      key: 1,
      dueDate: moment(booking.startDate).subtract(7, 'day'),
      amount: booking.price + 0.01,
    };

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
        expect(res.body.error).toBe('wrong installments info');

        // Intern account checks
        const {
          _id: internAccountId,
          income: oldInternIncom,
        } = accounts.internAccount;

        const { income: internIncom } = await Account.findById(internAccountId);

        expect(internIncom).toBe(oldInternIncom);

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

        expect(hostIncom).toBe(oldHostIncom);
        expect(oldHostCurrentBalance).toBe(hostCurrentBalance);

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

        expect(presspadIncom).toBe(oldPresspadIncom);
        expect(oldPresspadCurrentBalance).toBe(presspadCurrentBalance);

        // Installments check
        const [installment] = await Installment.find({
          booking: bookingId,
        });

        expect(installment).toBeUndefined();

        await connection.close();
        await mongoServer.stop();
        return done();
      });
  }, 20000);
});
