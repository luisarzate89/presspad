const mongoose = require("mongoose");

const User = require("../../../database/models/User");
const Review = require("../../../database/models/Review");
const buildDB = require("../../../database/data/test");

describe("Test Review schema", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test("Review schema should be defined", async () => {
    expect(Review).toBeDefined();
  });

  test("should store Review schema correctly", async (done) => {
    const reviews = await Review.find();
    expect(reviews).toHaveLength(2);
    done();
  });

  test("should store a new Review correctly", async (done) => {
    const interns = await User.find({ role: "intern" });
    const hosts = await User.find({ role: "host" });

    const newReview = {
      to: hosts[2],
      from: interns[1],
      rating: 2,
      message: "testing msg",
    };

    const storedReview = await Review.create(newReview);
    expect(storedReview).toBeDefined();
    expect(storedReview.rating).toBe(newReview.rating);
    done();
  });
});
