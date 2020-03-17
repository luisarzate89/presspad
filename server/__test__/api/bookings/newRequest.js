const request = require('supertest');
const moment = require('moment');

const buildDB = require('./../../../database/data/test/index');
const app = require('./../../../app');

const createToken = require('../../../helpers/createToken');

let connection;
let users;
let listings;

describe('Testing for create new booking route', () => {
  beforeEach(async () => {
    // build dummy data
    const {
      connection: _connection,
      users: _users,
      listings: _listings,
    } = await buildDB();
    connection = _connection;
    users = _users;
    listings = _listings;
  });

  afterAll(async () => {
    await connection.close();
  });

  test('test to create new booking with valid request', async done => {
    const { hostUser, internUser } = users;
    const { LondonListing } = listings;

    const token = `token=${createToken(internUser._id)}`;

    const data = {
      intern: internUser._id,
      host: hostUser._id,
      listing: LondonListing._id,
      startDate: moment.utc().add(40, 'days'),
      endDate: moment.utc().add(45, 'days'),
      price: 12000,
    };

    request(app)
      .post('/api/new-booking')
      .send(data)
      .set('Cookie', [token])
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();
        expect(res.body.success).toBeTruthy();
        done(err);
      });
  });

  test('test to create new booking with manipulated price value', async done => {
    const { hostUser, internUser } = users;
    const { LondonListing } = listings;

    const token = `token=${createToken(internUser._id)}`;

    const data = {
      intern: internUser._id,
      host: hostUser._id,
      listing: LondonListing._id,
      startDate: moment.utc().add(40, 'days'),
      endDate: moment.utc().add(45, 'days'),
      price: 1000,
    };

    request(app)
      .post('/api/new-booking')
      .send(data)
      .set('Cookie', [token])
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toBe("Price doesn't match!");
        done(err);
      });
  });

  test('test to create new booking with invalid request - duplicate booking dates', async done => {
    const { hostUser, internUser } = users;
    const { LondonListing } = listings;

    const token = `token=${createToken(internUser._id)}`;

    const data = {
      intern: internUser._id,
      host: hostUser._id,
      listing: LondonListing._id,
      startDate: moment.utc().add(10, 'days'),
      endDate: moment.utc().add(20, 'days'),
      price: 220,
    };

    request(app)
      .post('/api/new-booking')
      .send(data)
      .set('Cookie', [token])
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toBe(
          'user has already a booking request for those dates',
        );
        done(err);
      });
  });

  test('test to create new booking with invalid request - 7 days in advance', async done => {
    const { hostUser, internUser } = users;
    const { LondonListing } = listings;

    const token = `token=${createToken(internUser._id)}`;

    const data = {
      intern: internUser._id,
      host: hostUser._id,
      listing: LondonListing._id,
      startDate: moment.utc().add(6, 'days'),
      endDate: moment.utc().add(20, 'days'),
      price: 220,
    };

    request(app)
      .post('/api/new-booking')
      .send(data)
      .set('Cookie', [token])
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toBe(
          'you have to book at least 7 days in advance',
        );
        done(err);
      });
  });
});
