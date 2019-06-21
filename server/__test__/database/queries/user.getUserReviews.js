const mongoose = require("mongoose");

const buildDB = require("../../../database/data/test/index");

// get query
const { getUserReviews } = require("../../../database/queries/user/index");

// get models
const User = require("../../../database/models/User");

describe("Tests for getUserReviews query", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test("Test getUserReviews query with valid id", async (done) => {
    const hosts = await User.find({ role: "host" });

    await getUserReviews(hosts[0]._id).then((reviews) => {
      expect(reviews).toBeDefined();
      expect(reviews[0]).toBeDefined();
      expect(reviews[0].from_user.name).toBeDefined();
      expect(reviews[0].rating).toBeDefined();
    });
    done();
  });

  test("Test getUserReviewsquery with invalid id", async (done) => {
    await getUserReviews("123456").catch((err) => {
      expect(err).toBeDefined();
    });
    done();
  });
});
