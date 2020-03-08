const request = require('supertest');
const buildDB = require('./../../../database/data/test/index');
const app = require('./../../../app');

const createToken = require('./../../../helpers/createToken');

let connection;
let users;

describe('Testing for get host profile route', () => {
  beforeAll(async () => {
    // build dummy data
    const { connection: _connection, users: _users } = await buildDB();
    connection = _connection;
    users = _users;
  });

  afterAll(async () => {
    await connection.close();
  });

  test('test with correct user id', async done => {
    const { hostUser, internUser } = users;

    const token = `token=${createToken(internUser._id)}`;

    request(app)
      .get(`/api/host/${hostUser._id}`)
      .set('Cookie', [token])
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();
        expect(res.body.name).toBe(hostUser.name);
        expect(res.body.listing).toBeDefined();
        expect(res.body.profile).toBeDefined();
        expect(res.body.reviews).toBeDefined();
        done(err);
      });
  });

  test('test with incorrect user id', done => {
    const data = { userId: '5ce66c1635c86b54fd6c732c' };

    const { internUser } = users;

    const token = `token=${createToken(internUser._id)}`;

    request(app)
      .get(`/api/host/${data.userId}`)
      .set('Cookie', [token])
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, res) => {
        expect(res.body.error).toBeDefined();
        done(err);
      });
  });
});
