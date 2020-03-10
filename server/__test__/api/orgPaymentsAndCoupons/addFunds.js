const request = require('supertest');

const app = require('../../../app');
const { Account, ExternalTransaction } = require('../../../database/models');
const createToken = require('./../../../helpers/createToken');
const buildDb = require('../../../database/data/test');
const {
  API_ORG_PAYMENT_URL,
} = require('./../../../../client/src/constants/apiRoutes');
const { paymentMethod } = require('../internPayments/mockData');

describe('Testing Organisation payemnts (add funds):', () => {
  test('add "100 pound" funds to organisation', async done => {
    const { connection, mongoServer, accounts, users } = await buildDb({
      replSet: true,
    });

    const { organisationUser } = users;
    const token = `token=${createToken(organisationUser._id)}`;
    const fundsToAdd = 10000; // 100 pound * 100 penny

    const data = {
      amount: fundsToAdd,
      account: accounts.organisationAccount,
      paymentMethod,
    };

    request(app)
      .post(API_ORG_PAYMENT_URL)
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

        // Organisation account checks
        const {
          _id: orgAccountId,
          income: oldOrgIncom,
          currentBalance: oldOrgCurrentBalance,
        } = accounts.organisationAccount;

        const {
          income: orgIncom,
          currentBalance: orgCurrentBalance,
        } = await Account.findById(orgAccountId);

        expect(orgIncom - oldOrgIncom).toBe(fundsToAdd);
        expect(oldOrgCurrentBalance + fundsToAdd).toBe(orgCurrentBalance);

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

        expect(presspadIncom - oldPresspadIncom).toBe(fundsToAdd);
        expect(oldPresspadCurrentBalance + fundsToAdd).toBe(
          presspadCurrentBalance,
        );

        // ExternalTransaction check
        const [
          { amount: exTransactionAmmount, type: exTransactionType },
        ] = await ExternalTransaction.find({
          account: accounts.organisationAccount._id,
        })
          .limit(1)
          .sort({ $natural: -1 });

        expect(exTransactionAmmount).toBe(fundsToAdd);
        expect(exTransactionType).toBe('deposite');

        await connection.close();
        await mongoServer.stop();
        done();
      });
  }, 20000);
});
