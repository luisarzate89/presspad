const request = require('supertest');
const mongoose = require('mongoose');

const app = require('./../../app');
const buildDB = require('../../database/data/test/index');
const User = require('./../../database/models/User');
const Booking = require('./../../database/models/Booking');
const Notification = require('./../../database/models/Notification');

const {
  API_ACCEPT_BOOKING_URL,
} = require('../../../client/src/constants/apiRoutes');

describe('Testing host accepting booking route', () => {
  beforeAll(async done => {
    // build dummy data
    try {
      await buildDB();
      done();
    } catch (err) {
      done(err);
    }
  });

  afterAll(() => mongoose.disconnect());

  test('host should be able to approve a booking request', async done => {
    const host = await User.findOne({ role: 'host' });
    const bookingRequest = await Booking.findOne({
      host: host._id,
      status: 'pending',
    });
    const loginData = {
      email: host.email,
      password: '123456',
    };

    const notificationsBefore = await Notification.find({
      type: 'stayApproved',
      user: bookingRequest.intern,
    });

    request(app)
      .post('/api/user/login')
      .send(loginData)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (err, res) => {
        if (err) {
          done(err);
          return;
        }
        const token = res.headers['set-cookie'][0].split(';')[0];
        request(app)
          .patch(API_ACCEPT_BOOKING_URL.replace(':id', bookingRequest._id))
          .set('Cookie', [token])
          .send({ moneyGoTo: 'presspad' })
          .expect(200)
          .end(async (error, result) => {
            expect(result).toBeDefined();

            const acceptedRequest = await Booking.findById(bookingRequest._id);
            const notificationsAfter = await Notification.find({
              type: 'stayApproved',
              user: bookingRequest.intern,
            });

            expect(acceptedRequest.status).toBe('confirmed');
            // notification must be sent to intern
            expect(notificationsAfter.length).toBe(
              notificationsBefore.length + 1,
            );
            done();
          });
      });
  });
});
