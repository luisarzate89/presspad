const request = require('supertest');
const mongoose = require('mongoose');

const buildDB = require('./../../database/data/test/index');
const app = require('./../../app');

const { API_SIGNUP_URL } = require('../../../client/src/constants/apiRoutes');

const User = require('./../../database/models/User');

describe('Testing for signup route', () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('test correct intern details', async done => {
    const data = {
      userInfo: {
        email: 'intern@test.com',
        name: 'Ted Test',
        password: 'a123456A',
        role: 'intern',
      },
    };

    request(app)
      .post(API_SIGNUP_URL)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();
        expect(res.body.email).toBe(data.userInfo.email);
        expect(res.body.name).toBe(data.userInfo.name);
        expect(res.body.password).toBe(undefined);
        done(err);
      });
  });

  test('test if email already exists', async done => {
    const data = {
      userInfo: {
        email: 'intern@test.com',
        name: 'Ted Test',
        password: 'a123456A',
        role: 'intern',
      },
    };

    request(app)
      .post(API_SIGNUP_URL)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(409)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body.error).toBe('Email already taken');
        done(err);
      });
  });

  test('test host with correct details', async done => {
    const superhost = await User.find({ type: 'superhost' });

    const data = {
      userInfo: {
        email: 'host@test.com',
        name: 'Ted Test',
        password: 'a123456A',
        role: 'host',
        referral: superhost.id,
      },
    };

    request(app)
      .post(API_SIGNUP_URL)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body.email).toBe(data.userInfo.email);
        expect(res.referral).toBe(superhost.id);
        done(err);
      });
  });

  test('test organisation with correct details', async done => {
    const data = {
      userInfo: {
        email: 'organisation@test.com',
        name: 'Ted Test',
        password: 'a123456A',
        role: 'host',
        organisation: 'ITV',
      },
    };

    request(app)
      .post(API_SIGNUP_URL)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body.email).toBe(data.userInfo.email);
        done(err);
      });
  });
});
