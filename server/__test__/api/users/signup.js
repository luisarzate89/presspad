const request = require('supertest');

const buildDB = require('./../../../database/data/test');
const app = require('./../../../app');

const {
  API_SIGNUP_URL,
} = require('../../../../client/src/constants/apiRoutes');

let connection;
describe('Testing for signup route', () => {
  beforeAll(async () => {
    // build dummy data
    const { connection: _connection } = await buildDB();
    connection = _connection;
  });

  afterAll(async () => {
    await connection.close();
  });

  test('test correct {intern} details', async done => {
    const data = {
      email: 'newintern@test.com',
      name: 'Ted Test',
      password: 'a123456A',
      passwordConfirm: 'a123456A',
      role: 'intern',
    };

    request(app)
      .post(API_SIGNUP_URL)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();
        expect(res.body.email).toBe(data.email);
        expect(res.body.name).toBe(data.name);
        expect(res.body.password).toBe(undefined);
        done(err);
      });
  });

  test('test if email already exists', async done => {
    const data = {
      email: 'intern@test.com',
      name: 'Ted Test',
      password: 'a123456A',
      passwordConfirm: 'a123456A',
      role: 'intern',
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

  test('test {host} with correct details', async done => {
    const data = {
      email: 'newhost@test.com',
      name: 'Ted Test',
      password: 'a123456A',
      passwordConfirm: 'a123456A',
      role: 'host',
    };

    request(app)
      .post(API_SIGNUP_URL)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body.email).toBe(data.email);
        done(err);
      });
  });

  test('test {organisation} with correct details', async done => {
    const data = {
      email: 'neworganisation@test.com',
      name: 'Ted Test',
      password: 'a123456A',
      passwordConfirm: 'a123456A',
      role: 'organisation',
      organisation: 'ITV',
    };

    request(app)
      .post(API_SIGNUP_URL)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body.email).toBe(data.email);
        done(err);
      });
  });

  test('test {organisation} without organisation name', async done => {
    const data = {
      email: 'neworganisation@test.com',
      name: 'Ted Test',
      password: 'a123456A',
      passwordConfirm: 'a123456A',
      role: 'organisation',
    };

    request(app)
      .post(API_SIGNUP_URL)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(422)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body.error).toBe('Please enter your organisation');
        done(err);
      });
  });

  test('test {organisation} with weak password', async done => {
    const data = {
      email: 'neworganisation@test.com',
      name: 'Ted Test',
      password: '000000000',
      passwordConfirm: '000000000',
      role: 'organisation',
      organisation: 'ITV',
    };

    request(app)
      .post(API_SIGNUP_URL)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(422)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body.error).toBe(
          'Password requires 8 characters including at least 1 uppercase character and 1 number.',
        );
        done(err);
      });
  });
});
