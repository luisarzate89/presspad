const request = require('supertest');

const buildDB = require('../../../database/data/test');
const app = require('../../../app');

const createToken = require('./../../../helpers/createToken');

const {
  API_USER_URL,
} = require('./../../../../client/src/constants/apiRoutes');

let connection;
let users;

describe('Testing for user/check-user route to get user info from request cookie', () => {
  beforeAll(async () => {
    // build dummy data
    const { connection: _connection, users: _users } = await buildDB();
    connection = _connection;
    users = _users;
  });

  afterAll(async () => {
    await connection.close();
  });

  test('test with valid token {intern}', done => {
    const { internUser } = users;

    const token = `token=${createToken(internUser._id)}`;

    request(app)
      .get(API_USER_URL)
      .expect('Content-Type', /json/)
      .expect(200)
      .set('Cookie', [token])
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body.id).toBe(internUser._id.toString());
        expect(res.body.email).toBe(internUser.email);
        expect(res.body.role).toBe(internUser.role);
        expect(res.body.name).toBe(internUser.name);
        expect(res.body.organisation).toBe(internUser.organisation.toString());
        expect(res.body.password).toBeUndefined();
        done(err);
      });
  });

  test('test with valid token {organisation}', done => {
    const { organisationUser } = users;

    const token = `token=${createToken(organisationUser._id)}`;

    request(app)
      .get(API_USER_URL)
      .expect('Content-Type', /json/)
      .expect(200)
      .set('Cookie', [token])
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body.id).toBe(organisationUser._id.toString());
        expect(res.body.email).toBe(organisationUser.email);
        expect(res.body.role).toBe(organisationUser.role);
        expect(res.body.name).toBe(organisationUser.name);
        expect(res.body.organisation).toBe(
          organisationUser.organisation.toString(),
        );
        expect(res.body.password).toBeUndefined();
        done(err);
      });
  });

  test('test with invalid token', done => {
    const token = 'token=invalidtoken';

    request(app)
      .get(API_USER_URL)
      .set('Cookie', [token])
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        expect(res.body.error).toMatch('credentials are not valid');
        done(err);
      });
  });
});
