const request = require('supertest');

const buildDB = require('../../../database/data/test');
const user = require('../../../database/data/test/users');

const app = require('../../../app');

const createToken = require('./../../../helpers/createToken');

const {
  API_INTERNS_URL,
} = require('./../../../../client/src/constants/apiRoutes');

let connection;
let users;

describe('Testing for get all interns endpoint /interns', () => {
  beforeEach(async () => {
    // build dummy data
    const { connection: _connection, users: _users } = await buildDB();
    connection = _connection;
    users = _users;
  });

  afterAll(async () => {
    await connection.close();
  });

  test('test with admin privileges', done => {
    const { internUser, adminUser } = users;

    const token = `token=${createToken(adminUser._id)}`;

    request(app)
      .get(API_INTERNS_URL)
      .expect('Content-Type', /json/)
      .expect(200)
      .set('Cookie', [token])
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toHaveLength(1);
        expect(res.body[0]._id).toBe(internUser._id.toString());
        expect(res.body[0].email).toBe(internUser.email);
        expect(res.body[0].role).toBe(internUser.role);
        expect(res.body[0].name).toBe(internUser.name);
        expect(res.body[0].organisation).toBe(
          internUser.organisation.toString(),
        );
        expect(res.body[0].password).toBeUndefined();
        done(err);
      });
  });

  test('check get all interns from DB', async done => {
    const { adminUser } = users;

    const token = `token=${createToken(adminUser._id)}`;

    await user.createNew({ role: 'intern', email: 'newintern@test.com' });

    request(app)
      .get(API_INTERNS_URL)
      .expect('Content-Type', /json/)
      .expect(200)
      .set('Cookie', [token])
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toHaveLength(2);
        done(err);
      });
  });

  test('test with organisation privileges', done => {
    const { internUser, organisationUser } = users;

    const token = `token=${createToken(organisationUser._id)}`;

    request(app)
      .get(API_INTERNS_URL)
      .expect('Content-Type', /json/)
      .expect(200)
      .set('Cookie', [token])
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toHaveLength(1);
        expect(res.body[0]._id).toBe(internUser._id.toString());
        expect(res.body[0].email).toBe(internUser.email);
        expect(res.body[0].role).toBe(internUser.role);
        expect(res.body[0].name).toBe(internUser.name);
        expect(res.body[0].organisation).toBe(
          internUser.organisation.toString(),
        );
        expect(res.body[0].password).toBeUndefined();
        done(err);
      });
  });

  test('test without privileges', done => {
    const { hostUser } = users;

    const token = `token=${createToken(hostUser._id)}`;

    request(app)
      .get(API_INTERNS_URL)
      .expect('Content-Type', /json/)
      .expect(403)
      .set('Cookie', [token])
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body.error).toBe('You have no permission');
        done(err);
      });
  });

  test('test without token', done => {
    request(app)
      .get(API_INTERNS_URL)
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body.error).toBe('no credentials');
        done(err);
      });
  });
});
