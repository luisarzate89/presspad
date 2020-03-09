const request = require('supertest');

const buildDB = require('./../../../database/data/test');
const app = require('./../../../app');

let connection;
describe('Testing for login route', () => {
  beforeAll(async () => {
    // build dummy data
    const { connection: _connection } = await buildDB();
    connection = _connection;
  });

  afterAll(async () => {
    await connection.close();
  });

  test('test with correct email', done => {
    const data = {
      email: 'intern@test.com',
      password: '123456',
    };

    request(app)
      .post('/api/user/login')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body.email).toBe(data.email);
        expect(res.headers['set-cookie'][0]).toMatch('token');
        done(err);
      });
  });

  test('test with invalid request email', done => {
    const data = {
      email: 'Wrong@email.com',
      password: '123456',
    };

    request(app)
      .post('/api/user/login')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        expect(res.body.error).toMatch('Login failed. User does not exist');
        done(err);
      });
  });

  test('test with invalid request password', done => {
    const data = {
      email: 'michael@financialtimes.co.uk',
      password: '123456563322',
    };

    request(app)
      .post('/api/user/login')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        expect(res.body.error).toMatch('Login failed. User does not exist');
        done(err);
      });
  });
});
