const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("./../../database/data/test/index");
const app = require("./../../app");

const Review = require("./../../database/models/Review");
const User = require("./../../database/models/User");
const Notification = require("./../../database/models/Notification");

describe("Tests adding a review and creating a getReview notification", () => {
  beforeAll(async (done) => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("tests adding a review successfully", async (done) => {
    const reviewee = await User.findOne({ name: "Michael Peters" });
    const reviewer = await User.findOne({ name: "Josephine Doeski" });

    const reviewData = {
      to: reviewee.id, // person receiving the review >> also the second party in notification
      from: reviewer.id,
      rating: 4,
      message: "Farah cannot use jest",
    };

    request(app)
      .post(`/api/users/${reviewer.id}/reviews`)
      .send(reviewData)
      .expect(200)
      .expect("Content-Type", /json/)
      .end(async (err, res) => {
        if (err) return console.error(err);
        expect(res).toBeDefined();
        const review = await Review.findOne({ to: reviewData.to });
        const notification = await Notification.findById({ secondParty: reviewData.to });
        expect(notification.secondParty).toBe(review.to);
        console.log(review);
        done();
      });
  }, 30000);
});
