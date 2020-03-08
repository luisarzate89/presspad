const request = require('supertest');

const buildDB = require('./../../../database/data/test');
const { createNew } = require('./../../../database/data/test/profiles');
const app = require('./../../../app');
const createToken = require('./../../../helpers/createToken');

const {
  API_VERIFY_PROFILE_URL,
} = require('./../../../../client/src/constants/apiRoutes');

const Profile = require('./../../../database/models/Profile');

let connection;
let users;

describe('Testing to approve and reject profiles', () => {
  beforeEach(async () => {
    // build dummy data
    const { connection: _connection, users: _users } = await buildDB();
    connection = _connection;
    users = _users;
  });

  afterAll(async () => {
    await connection.close();
  });

  test('test succesful approval of profile', async done => {
    const { adminUser } = users;

    const hostProfile = await createNew({
      fillMissedFields: true,
      userData: { role: 'host' },
      profileData: { verified: false },
    });

    expect(hostProfile.verified).toBe(false);

    const token = `token=${createToken(adminUser._id)}`;

    const data = { verify: true, profileId: hostProfile.id };

    request(app)
      .post(API_VERIFY_PROFILE_URL)
      .set('Cookie', [token])
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (error, result) => {
        expect(result).toBeDefined();
        expect(result.body).toBe('success');
        const updatedProfile = await Profile.findById(hostProfile.id);
        expect(updatedProfile.verified).toBe(true);
        done(error);
      });
  });

  test('test succesful reject of profile', async done => {
    const { adminUser } = users;

    const hostProfile = await createNew({
      fillMissedFields: true,
      userData: { role: 'host' },
      profileData: { verified: true },
    });

    expect(hostProfile.verified).toBe(true);

    const token = `token=${createToken(adminUser._id)}`;

    const data = { verify: false, profileId: hostProfile.id };

    request(app)
      .post(API_VERIFY_PROFILE_URL)
      .set('Cookie', [token])
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (error, result) => {
        expect(result).toBeDefined();
        expect(result.body).toBe('success');
        const updatedProfile = await Profile.findById(hostProfile.id);
        expect(updatedProfile.verified).toBe(false);
        done(error);
      });
  });

  test('test for authorizations', async done => {
    const { internUser } = users;

    const hostProfile = await createNew({
      fillMissedFields: true,
      userData: { role: 'host' },
      profileData: { verified: false },
    });

    expect(hostProfile.verified).toBe(false);

    const token = `token=${createToken(internUser._id)}`;

    const data = { verify: true, profileId: hostProfile.id };

    request(app)
      .post(API_VERIFY_PROFILE_URL)
      .set('Cookie', [token])
      .send(data)
      .expect('Content-Type', /json/)
      .expect(403)
      .end(async (error, result) => {
        expect(result).toBeDefined();
        expect(result.body.error).toBe('Only admin can access this route');
        const updatedProfile = await Profile.findById(hostProfile.id);
        // shouldn't be changed
        expect(updatedProfile.verified).toBe(false);
        done(error);
      });
  });
});
