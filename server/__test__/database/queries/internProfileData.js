const mongoose = require('mongoose');

const buildDB = require('../../../database/data/test/index');

// get query
const {
  internProfileData,
} = require('../../../database/queries/profile/internProfile');

// get models
const User = require('../../../database/models/User');

describe('Tests for internProfile queries', () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test('Test internProfile query with valid id', async done => {
    const interns = await User.find({ role: 'intern' });
    await internProfileData(interns[0]._id).then(profileData => {
      expect(profileData[0]).toBeDefined();
      expect(profileData[0].name).toBe(interns[0].name);
      expect(profileData[0].profile).toBeDefined();
      expect(profileData[0].profile.bio).toBeDefined();
    });
    done();
  });

  test('Test intern profile data query with invalid id', async done => {
    await internProfileData('123456').catch(err => {
      expect(err).toBeDefined();
    });
    done();
  });
});
