const mongoose = require("mongoose");

const Booking = require("../../../database/models/Booking");
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
    const booking = await Booking.findOne();
    const reviewee = booking.intern;
    const reviewer = booking.host;

    const newReview = {
      to: reviewee,
      from: reviewer,
      rating: 2,
      message: "testing msg",
      booking: booking._id,
    };

    const storedReview = await Review.create(newReview);
    expect(storedReview).toBeDefined();
    expect(storedReview.rating).toBe(newReview.rating);
    done();
  });
});
