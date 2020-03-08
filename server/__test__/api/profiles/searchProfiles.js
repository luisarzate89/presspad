const request = require('supertest');

const buildDB = require('./../../../database/data/test/index');
const app = require('./../../../app');

const {
  API_SEARCH_PROFILES_URL,
} = require('./../../../../client/src/constants/apiRoutes');

const { createNew } = require('./../../../database/data/test/listings');

let connection;
let listings;

describe('Testing for get host profile route', () => {
  beforeAll(async () => {
    // build dummy data
    const { connection: _connection, listings: _listings } = await buildDB();
    connection = _connection;
    listings = _listings;
  });

  afterAll(async () => {
    await connection.close();
  });

  test('test with correct city and dates', done => {
    const { LondonListing } = listings;
    const data = {
      city: 'London',
      startDate: Date.now() + 2 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 7 * 24 * 60 * 60 * 1000,
    };

    request(app)
      .post(API_SEARCH_PROFILES_URL)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();
        expect(res.body.length).toBe(1);

        expect(res.body[0].address).toEqual({
          ...LondonListing.address,
          // postcode should be trimmed
          postcode: 'E5',
        });

        expect(res.body[0].photos).toHaveLength(3);
        // first image only should have url
        expect(res.body[0].photos[0].url).toBeDefined();
        expect(res.body[0].photos[1].url).toBeUndefined();
        expect(res.body[0].photos[2].url).toBeUndefined();
        done(err);
      });
  });

  test('Get no listings with city and dates if city not found', done => {
    const data = {
      city: 'Birmingham',
      startDate: Date.now() + 2 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 7 * 24 * 60 * 60 * 1000,
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
    await createNew({
      fillMissedFields: true,
      listingData: {
        address: {
          addressline1: '21 Roding Road 2',
          addressline2: '22 Roding Road 2',
          city: 'London',
          postcode: 'E50DW2',
        },
      },
    });

    const data = { city: 'London' };

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
});
