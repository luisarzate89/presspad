const request = require("supertest");
const mongoose = require("mongoose");

const User = require("../../database/models/User");
const Listing = require("../../database/models/Listing");

const buildDB = require("./../../database/data/test/index");
const app = require("./../../app");

describe("Testing for create new booking route", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    // build dummy data
    await buildDB();
  });

  test("test to create new booking with valid request", async (done) => {
    const interns = await User.find({ role: "intern" });
    const hosts = await User.find({ role: "host" });

    const listing = await Listing.findOne({ user: hosts[0]._id });

    const data = {
      user: interns[0]._id,
      listing: listing._id,
      startDate: "2019-07-01T00:00:00.000Z",
      endDate: "2019-07-04T00:00:00.000Z",
      payment: 405,
    };

    request(app)
      .post("/api/new-booking")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();
        expect(res.body.success).toBeTruthy();
        done(err);
      });
  });

  test("test to create new booking with invalid request - duplicate booking dates", async (done) => {
    const interns = await User.find({ role: "intern" });

    const hosts = await User.find({ role: "host" });

    const listing = await Listing.findOne({ user: hosts[0]._id });

    const data = {
      user: interns[0]._id,
      listing: listing._id,
      startDate: "2019-06-21T00:00:00.000Z",
      endDate: "2019-06-29T00:00:00.000Z",
      payment: 405,
    };

    request(app)
      .post("/api/new-booking")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();
        expect(res.body.error).toBeDefined();
        expect(res.body.error).toBe("user has already a booking request for those dates");
        done(err);
      });
  });
});
