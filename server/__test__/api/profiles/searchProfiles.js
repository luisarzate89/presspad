const request = require('supertest');
const mongoose = require('mongoose');

const buildDB = require('./../../database/data/test/index');
const app = require('./../../app');

const {
  API_SEARCH_PROFILES_URL,
} = require('./../../../client/src/constants/apiRoutes');

describe('Testing for get host profile route', () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('test with correct city and dates', done => {
    const data = {
      city: 'London',
      startDate: '2020-02-12',
      endDate: '2020-02-15',
    };

    request(app)
      .post(API_SEARCH_PROFILES_URL)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();
        expect(res.body.length).toBe(2);
        expect(res.body[0].address.city).toBe('London');
        expect(res.body[1].address.city).toBe('London');
        done(err);
      });
  });

  test('Get no listings with city and dates if city not found', done => {
    const data = {
      city: 'Birmingham',
      startDate: '2020-02-12',
      endDate: '2020-02-15',
    };

    request(app)
      .post(API_SEARCH_PROFILES_URL)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();
        expect(res.body.length).toBe(0);
        done(err);
      });
  });

  test('Get no listings with city and dates if dates and city not found', done => {
    const data = {
      city: 'Birmingham',
      startDate: '2020-12-13',
      endDate: '2020-12-15',
    };

    request(app)
      .post(API_SEARCH_PROFILES_URL)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();
        expect(res.body.length).toBe(0);
        done(err);
      });
  });

  test('Get London listings when only city entered', async done => {
    const data = { city: 'London' };

    request(app)
      .post(API_SEARCH_PROFILES_URL)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();
        expect(res.body.length).toBe(3);
        expect(res.body[0].address.city).toBe('London');
        expect(res.body[1].address.city).toBe('London');
        done(err);
      });
  });
});
