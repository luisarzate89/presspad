const mongoose = require("mongoose");

const buildDB = require("../../../database/data/test/index");

// get query
const { hostProfileData } = require("../../../database/queries/profile/hostProfile");

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

  test("Test hostProfile query with valid id", async (done) => {
    const hosts = await User.find({ email: "adam@gmail.com" });
    await hostProfileData(hosts[0]._id).then((profileData) => {
      expect(profileData).toBeDefined();
      expect(profileData[0].email).toBe(hosts[0].email);
      expect(profileData[0].listing._id).toBeDefined();
      expect(profileData[0].profile._id).toBeDefined();
    });
    done();
  });

  test("Test host profile data query with invalid id", async (done) => {
    await hostProfileData("5ce66c1635c86b54fd6c732c").catch((err) => {
      expect(err).toBeDefined();
    });
    done();
  });
});
