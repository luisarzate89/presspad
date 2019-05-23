const mongoose = require("mongoose");

const buildDB = require("../../../database/data/test/index");

// get query
const hostProfileData = require("../../../database/queries/profile/hostProfile");

// get models
const User = require("../../../database/models/User");

describe("Tests for hostProfile queries", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test("Test query with valid id", async (done) => {
    const hosts = await User.find({ role: "host" });
    await hostProfileData(hosts[0]._id).then((profileData) => {
      expect(profileData).toBeDefined();
      expect(profileData[0].email).toBe(hosts[0].email);
      expect(profileData[0].listing._id).toBeDefined();
      expect(profileData[0].profile._id).toBeDefined();
      expect(profileData[0].reviews[0]._id).toBeDefined();
    });
    done();
  });

  test("Test query with invalid id", async (done) => {
    await hostProfileData("123456").catch((err) => {
      expect(err).toBeDefined();
    });
    done();
  });
});
