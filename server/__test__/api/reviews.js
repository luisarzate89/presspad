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

  const loginData = {
    email: "josephine@guardian.co.uk",
    password: "123456",
  };

  test("tests adding a review successfully", async (done) => {
    const reviewee = await User.findOne({ name: "Michael Peters" });
    const reviewer = await User.findOne({ name: "Josephine Doeski" });

    const reviewData = {
      to: reviewee.id, // person receiving the review >> also the user in notification
      from: reviewer.id, // person sending the creating, also the secondParty in notification
      rating: 4,
      message: "Farah cannot use jest",
    };

    request(app)
      .post("/api/user/login")
      .send(loginData)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((error, response) => {
        const token = response.headers["set-cookie"][0].split(";")[0];

        // Request should create a document in Review collection
        // and a document in Notification collection.
        request(app)
          .post(`/api/users/${reviewer.id}/reviews`)
          .send(reviewData)
          .set("Cookie", [token])
          .expect(200)
          .expect("Content-Type", /json/)
          .end(async (err, res) => {
            if (err) return done(err);
            // make sure a res.end() is called somewhere in the controller
            expect(res).toBeDefined();

            // find the newly created documents (in Review and Notification schema)
            const review = await Review.findOne({ to: reviewData.to });
            const notification = await Notification.findOne({ secondParty: reviewData.from });

            // there should be a review and a notification entries.
            // fails if returned value is null
            expect(review).toBeTruthy();
            expect(notification).toBeTruthy();

            // the new entry should have a type of getReview
            expect(notification.type).toBe("getReview");
            // the two documents should be linked via ids from the user schema
            expect(notification.user).toMatchObject(review.to);
            expect(notification.secondParty).toMatchObject(review.from);
            return done();
          });
      });

  }, 30000);

  test("check that input validation works as intended for rating", async (done) => {
    const reviewee = await User.findOne({ name: "Michael Peters" });
    const reviewer = await User.findOne({ name: "Josephine Doeski" });

    const reviewData = {
      to: reviewee.id, // person receiving the review >> also the user in notification
      from: reviewer.id, // person sending the creating, also the secondParty in notification
      rating: "",
      message: "Farah cannot use jest",
    };

    request(app)
      .post("/api/user/login")
      .send(loginData)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((error, response) => {
        const token = response.headers["set-cookie"][0].split(";")[0];

        // Request should fail with a bad request error (code 400)
        request(app)
          .post(`/api/users/${reviewer.id}/reviews`)
          .send(reviewData)
          .send("Cookie", [token])
          .expect(400)
          .expect("Content-Type", /json/)
          .end((err) => {
            if (err) return done(err);
            return done();
          });
      });
  }, 30000);


  test("check that input validation works as intended for message", async (done) => {
    const reviewee = await User.findOne({ name: "Michael Peters" });
    const reviewer = await User.findOne({ name: "Josephine Doeski" });

    const reviewData = {
      to: reviewee.id, // person receiving the review >> also the user in notification
      from: reviewer.id, // person sending the creating, also the secondParty in notification
      rating: 4,
      message: "",
    };
    request(app)
      .post("/api/user/login")
      .send(loginData)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((error, response) => {
        const token = response.headers["set-cookie"][0].split(";")[0];

        // Request should fail with a bad request error (code 400)
        request(app)
          .post(`/api/users/${reviewer.id}/reviews`)
          .send(reviewData)
          .set("Cookie", [token])
          .expect(400)
          .expect("Content-Type", /json/)
          .end((err) => {
            if (err) return done(err);
            return done();
          });
      });
  }, 30000);
});
