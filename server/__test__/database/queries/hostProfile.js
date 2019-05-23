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

  test("Test query", async (done) => {
    const hosts = await User.find({ role: "host" });
    await hostProfileData(hosts[0]._id).then((profileData) => {
      expect(profileData).toBe(0);
    });
    done();
  });
});
