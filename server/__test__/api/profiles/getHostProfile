const request = require('supertest');
const mongoose = require('mongoose');

const User = require('../../database/models/User');

const buildDB = require('./../../database/data/test/index');
const app = require('./../../app');

describe('Testing for get host profile route', () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    // build dummy data
    await buildDB();
  });

  test('test with correct user id', async done => {
    const host = await User.findOne({ email: 'adam@gmail.com' });

    request(app)
      .get(`/api/host/${host._id}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();
        expect(res.body.name).toBe(host.name);
        expect(res.body.listing).toBeDefined();
        expect(res.body.profile).toBeDefined();
        expect(res.body.reviews).toBeDefined();
        done(err);
      });
  });

  test('test with incorrect user id', done => {
    const data = { userId: '5ce66c1635c86b54fd6c732c' };

    request(app)
      .get(`/api/host/${data.userId}`)
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, res) => {
        expect(res.body.error).toBeDefined();
        done(err);
      });
  });
});
