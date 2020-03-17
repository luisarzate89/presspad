const request = require('supertest');

const buildDB = require('../../../database/data/test');
const app = require('../../../app');
const createToken = require('../../../helpers/createToken');

const {
  API_BOOKING_REVIEW_INFO_URL,
} = require('../../../../client/src/constants/apiRoutes');

let connection;
let users;
let bookings;

describe('Testing for getting bookings partners', () => {
  beforeEach(async () => {
    // build dummy data
    const {
      connection: _connection,
      users: _users,
      bookings: _bookings,
    } = await buildDB();
    connection = _connection;
    users = _users;
    bookings = _bookings;
  });

  afterAll(async () => {
    await connection.close();
  });

  test('should get the intern and host profiles', async done => {
    const { hostUser, internUser } = users;
    const { completedBooking } = bookings;

    const token = `token=${createToken(hostUser._id)}`;

    request(app)
      .get(
        API_BOOKING_REVIEW_INFO_URL.replace(':bookingId', completedBooking._id),
      )
      .set('Cookie', [token])
      .expect(200)
      .end(async (error, result) => {
        expect(result).toBeDefined();
        expect(result.body.populatedBooking.status).toBe(
          completedBooking.status,
        );
        expect(result.body.populatedBooking._id.toString()).toBe(
          completedBooking._id.toString(),
        );
        expect(result.body.populatedBooking.intern).toBeDefined();
        expect(result.body.populatedBooking.intern.name).toBe(internUser.name);
        expect(result.body.populatedBooking.host.name).toBe(hostUser.name);
        done();
      });
  });
});
