const request = require('supertest');

const buildDB = require('../../../database/data/test');
const app = require('../../../app');
const createToken = require('../../../helpers/createToken');

// API ROUTE
const {
  API_FIND_WITHDRAW_REQUESTS_URL,
} = require('../../../../client/src/constants/apiRoutes');

let connection;
let users;
let withdrawRequests;

describe('Testing for get host profile route', () => {
  beforeEach(async () => {
    // build dummy data
    const {
      connection: _connection,
      users: _users,
      withdrawRequests: _withdrawRequests,
    } = await buildDB();
    connection = _connection;
    users = _users;
    withdrawRequests = _withdrawRequests;
  });

  afterAll(async () => {
    await connection.close();
  });

  // tests user validation
  test('Admin is able to view all withdrawal requests', async done => {
    const { adminUser, hostUser } = users;
    const { pendingWithdrawRequest } = withdrawRequests;

    const token = `token=${createToken(adminUser._id)}`;

    request(app)
      .get(API_FIND_WITHDRAW_REQUESTS_URL)
      .set('Cookie', [token])
      .expect(200)
      .expect('Content-Type', /json/)
      .end(async (error, response) => {
        if (error) return done(error);
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0].user.name).toBe(hostUser.name);
        expect(response.body[0].status).toBe(pendingWithdrawRequest.status);
        expect(response.body[0].amount).toBe(pendingWithdrawRequest.amount);
        expect(response.body[0].bankName).toBe(pendingWithdrawRequest.bankName);
        expect(response.body[0].bankSortCode).toBe(
          pendingWithdrawRequest.bankSortCode,
        );
        expect(response.body[0].accountNumber).toBe(
          pendingWithdrawRequest.accountNumber,
        );

        return done();
      });
  });

  test('Other users are unable to view all withdrawal requests', async done => {
    const { hostUser } = users;

    const token = `token=${createToken(hostUser._id)}`;

    request(app)
      .get(API_FIND_WITHDRAW_REQUESTS_URL)
      .set('Cookie', [token])
      .expect(403)
      .expect('Content-Type', /json/)
      .end(async error => {
        if (error) return done(error);
        return done();
      });
  });
});
