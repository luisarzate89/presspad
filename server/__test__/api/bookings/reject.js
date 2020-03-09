const request = require('supertest');

const app = require('../../../app');
const buildDB = require('../../../database/data/test/index');
const Booking = require('../../../database/models/Booking');
const Notification = require('./../../../database/models/Notification');

const {
  API_REJECT_BOOKING_URL,
} = require('../../../../client/src/constants/apiRoutes');

const createToken = require('../../../helpers/createToken');

let connection;
let users;
let bookings;

describe('Testing for host should be able to reject booking route', () => {
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

  test('host should be able to reject a booking request', async done => {
    const { hostUser } = users;
    const { pendingBooking } = bookings;

    const token = `token=${createToken(hostUser._id)}`;

    const notificationsBefore = await Notification.find({
      type: 'stayRejected',
      user: pendingBooking.intern,
    });

    request(app)
      .patch(API_REJECT_BOOKING_URL.replace(':id', pendingBooking._id))
      .set('Cookie', [token])
      .expect(200)
      .end(async (error, result) => {
        expect(result).toBeDefined();

        const acceptedRequest = await Booking.findById(pendingBooking._id);
        const notificationsAfter = await Notification.find({
          type: 'stayRejected',
          user: pendingBooking.intern,
        });

        expect(acceptedRequest.status).toBe('canceled');
        expect(acceptedRequest.canceledBy.toString()).toBe(
          hostUser._id.toString(),
        );
        // notification must be sent to intern
        expect(notificationsAfter.length).toBe(notificationsBefore.length + 1);
        done();
      });
  });
});
