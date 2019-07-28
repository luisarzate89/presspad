const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("./../../database/data/test/index");
const app = require("./../../app");

const { API_REVIEW_URL } = require("./../../../client/src/constants/apiRoutes");
const Review = require("./../../database/models/Review");
const User = require("./../../database/models/User");
const Notification = require("./../../database/models/Notification");

describe("Tests adding a review and creating a getReview notification", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("tests adding a review successfully", async () => {
    const reviewee = User.findOne({ name: "Michael Peters" });
    const reviewer = User.findOne({ name: "Josephine Doeski" });

    const reviewData = {
      to: reviewee.id,
      from: reviewer.id,
      stars: 4,
      message: "very great host",
    };

    request(app)
      .post(API_REVIEW_URL)
      .send(reviewData)
      .expect(200)
      .expect("Content-Type", /json/)
      .end(async (err, res) => {
        if (err) return console.error(err);
        expect(res).toBeDefined();
        console.log(Review.findOne({ to: reviewData.to }));
        console.log(Notification.findById({ secondParty: reviewData.to }));
      });
  });
});
