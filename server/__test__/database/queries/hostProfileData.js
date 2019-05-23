const mongoose = require("mongoose");

const buildDB = require("../../../database/data/test/index");

// get query
const { hostProfileData, hostReviews } = require("../../../database/queries/profile/hostProfile");

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
    const hosts = await User.find({ role: "host" });
    await hostProfileData(hosts[0]._id).then((profileData) => {
      expect(profileData).toBeDefined();
      expect(profileData[0].email).toBe(hosts[0].email);
      expect(profileData[0].listing._id).toBeDefined();
      expect(profileData[0].profile._id).toBeDefined();
    });
    done();
  });

  test("Test host profile data query with invalid id", async (done) => {
    await hostProfileData("123456").catch((err) => {
      expect(err).toBeDefined();
    });
    done();
  });

  test("Test hostReviews query with valid id", async (done) => {
    const hosts = await User.find({ role: "host" });

    await hostReviews(hosts[0]._id).then((reviews) => {
      expect(reviews).toBeDefined();
      expect(reviews[0]).toBeDefined();
      expect(reviews[0].from.name).toBeDefined();
      expect(reviews[0].rating).toBeDefined();
    });
    done();
  });

  test("Test hostReviews query with invalid id", async (done) => {
    await hostProfileData("123456").catch((err) => {
      expect(err).toBeDefined();
    });
    done();
  });
});
