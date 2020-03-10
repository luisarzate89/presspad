const request = require('supertest');

const buildDB = require('../../../database/data/test');
const app = require('../../../app');
const createToken = require('../../../helpers/createToken');

const {
  API_HOST_DASHBOARD_URL,
} = require('../../../../client/src/constants/apiRoutes');

let connection;
let users;

describe('Testing for host dashboard route', () => {
  beforeEach(async () => {
    // build dummy data
    const { connection: _connection, users: _users } = await buildDB();
    connection = _connection;
    users = _users;
  });

  afterAll(async () => {
    await connection.close();
  });

  test("test with an host user's role", done => {
    const { hostUser } = users;
    const token = `token=${createToken(hostUser._id)}`;

    request(app)
      .get(API_HOST_DASHBOARD_URL)
      .set('Cookie', [token])
      .expect(200)
      .end((error, result) => {
        expect(result).toBeDefined();
        const {
          name,
          profile,
          notifications,
          bookings,
          account,
          withdrawRequests,
          nextBookingWithDetails,
          requestedAmount,
        } = result.body;

        expect(name).toBe(hostUser.name);
        expect(profile).toBeDefined();
        expect(profile.profileImage.url).toMatch(
          /https:\/\/storage.googleapis.com\/*\/*.*/,
        );

        expect(notifications).toBeDefined();
        expect(notifications).toHaveLength(1);
        expect(notifications[0].secondParty).toBeDefined();
        expect(notifications[0].user).toBeDefined();
        expect(notifications[0].user.toString()).toBe(hostUser._id.toString());

        expect(account).toBeDefined();
        expect(account.withdrawal).toBeDefined();

        expect(withdrawRequests).toBeDefined();
        expect(withdrawRequests).toHaveLength(2);
        expect(withdrawRequests[0].status).toBe('pending');

        expect(nextBookingWithDetails).toBeDefined();
        expect(nextBookingWithDetails.status).toBe('confirmed');

        expect(requestedAmount).toBe(10000);

        expect(bookings).toBeDefined();
        expect(bookings).toHaveLength(4);
        expect(bookings[0].status).toBeDefined();
        expect(bookings[0].startDate).toBeDefined();
        expect(bookings[0].endDate).toBeDefined();
        expect(bookings[0].intern).toBeDefined();
        expect(bookings[0].intern.name).toBeDefined();
        expect(bookings[0].intern.profile).toBeDefined();
        done();
      });
  });
});
