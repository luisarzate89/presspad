const request = require('supertest');

const app = require('../../../app');
const { Account } = require('../../../database/models');

const buildDb = require('../../../database/data/test');

describe('Testing Organisation payemnts (create coupons):', () => {
  const loginData = {
    email: 'organisation@test.com',
    password: '123456',
  };

  test('create new coupon', async done => {
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
        // coupon for 10 days = 15000 + 3 * 2000 = 21000
        // 21000 * 50% = 10500
        const newCouponValue = 10500; // 105 pound * 100 penny

        const data = {
          internName: 'some intern',
          discountRate: 50,
          startDate: Date.now() + 20 * 24 * 60 * 60 * 1000,
          endDate: Date.now() + 29 * 24 * 60 * 60 * 1000,
        };

        request(app)
          .post('/api/coupons')
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
            expect(res.body.code).toBeDefined();
            expect(res.body.reservedAmount).toBe(newCouponValue);

            // Organisation account checks
            const {
              _id: orgAccountId,
              income: oldOrgIncom,
              currentBalance: oldOrgCurrentBalance,
              couponsValue: oldCouponValue,
            } = accounts.organisationAccount;

            const {
              income: orgIncom,
              currentBalance: orgCurrentBalance,
              couponsValue,
            } = await Account.findById(orgAccountId);

            expect(orgIncom).toBe(oldOrgIncom);
            expect(oldOrgCurrentBalance - newCouponValue).toBe(
              orgCurrentBalance,
            );
            expect(oldCouponValue + newCouponValue).toBe(couponsValue);

            await connection.close();
            await mongoServer.stop();
            done();
          });
      });
  }, 20000);
});
