const request = require('supertest');

const buildDB = require('./../../../database/data/test');
const app = require('./../../../app');
const createToken = require('./../../../helpers/createToken');

const {
  API_ORGS_DASHBOARD_URL,
} = require('../../../../client/src/constants/apiRoutes');

let connection;
let users;

describe('Testing for organisation dashboard data', () => {
  beforeEach(async () => {
    // build dummy data
    const { connection: _connection, users: _users } = await buildDB();
    connection = _connection;
    users = _users;
  });

  afterAll(async () => {
    await connection.close();
  });

  test("test with an organisation user's role", done => {
    const { organisationUser } = users;

    const token = `token=${createToken(organisationUser._id)}`;

    request(app)
      .get(API_ORGS_DASHBOARD_URL)
      .set('Cookie', [token])
      .expect('Content-Type', /json/)
      .expect(200)
      .end((error, result) => {
        expect(result).toBeDefined();
        expect(result.body).toHaveLength(3);

        const [details, notifications, interns] = result.body;
        expect(details).toBeDefined();
        expect(details[0].name).toBe('Financial Times');

        expect(notifications).toBeDefined();
        expect(notifications).toHaveLength(1);
        expect(notifications[0].secondParty).toBeDefined();
        expect(notifications[0].user).toBeDefined();

        expect(interns).toBeDefined();
        done(error);
      });
  });

  test('test unauthorized user', done => {
    const { internUser } = users;

    const token = `token=${createToken(internUser._id)}`;

    request(app)
      .get(API_ORGS_DASHBOARD_URL)
      .set('Cookie', [token])
      .expect('Content-Type', /json/)
      .expect(401)
      .end(done);
  });
});
