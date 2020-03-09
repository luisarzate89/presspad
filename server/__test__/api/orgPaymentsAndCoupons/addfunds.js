const request = require('supertest');

const app = require('../../../app');
const { Account, ExternalTransaction } = require('../../../database/models');

const buildDb = require('../../../database/data/test');

describe('Testing Organisation payemnts (add funds):', () => {
  const loginData = {
    email: 'organisation@test.com',
    password: '123456',
  };

  const paymentMethod = {
    id: 'pm_1GDU8eDfm5MEAc97hLgEL9yQ',
    object: 'payment_method',
    billing_details: {
      address: {
        city: null,
        country: null,
        line1: null,
        line2: null,
        postal_code: '42424',
        state: null,
      },
      email: null,
      name: null,
      phone: null,
    },
    card: {
      brand: 'visa',
      checks: {
        address_line1_check: null,
        address_postal_code_check: null,
        cvc_check: null,
      },
      country: 'US',
      exp_month: 4,
      exp_year: 2024,
      funding: 'credit',
      generated_from: null,
      last4: '4242',
      three_d_secure_usage: { supported: true },
      wallet: null,
    },
    created: 1582024877,
    customer: null,
    livemode: false,
    metadata: {},
    type: 'card',
  };

  test('add "100 pound" funds to organisation', async done => {
    const { connection, mongoServer, accounts } = await buildDb({
      replSet: true,
    });

    request(app)
      .post('/api/user/login')
      .send(loginData)
      .end(async (error, response) => {
        if (error) {
          await connection.close();
          await mongoServer.stop();
          return done(error);
        }

        const token = response.headers['set-cookie'][0].split(';')[0];
        const fundsToAdd = 10000; // 100 pound * 100 penny

        const data = {
          amount: fundsToAdd,
          account: accounts.organisationAccount,
          paymentMethod,
        };

        request(app)
          .post('/api/org/payment')
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
      });
  }, 20000);
});
