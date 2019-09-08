const request = require("supertest");
const mongoose = require("mongoose");
const moment = require("moment");

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
    const hosts = await User.find({ role: "host" }).sort({ name: 1 });

    const listing = await Listing.findOne({ user: hosts[2]._id });

    const data = {
      intern: interns[0]._id,
      host: listing.user,
      listing: listing._id,
      startDate: moment.utc().add(30, "days"),
      endDate: moment.utc().add(37, "days"),
      price: 150,
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
      intern: interns[0]._id,
      host: listing.user,
      listing: listing._id,
      startDate: moment.utc().add(10, "days"),
      endDate: moment.utc().add(20, "days"),
      price: 220,
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

  test("test to create new booking with invalid request - 7 days in advance", async (done) => {
    const interns = await User.find({ role: "intern" });

    const hosts = await User.find({ role: "host" });

    const listing = await Listing.findOne({ user: hosts[0]._id });

    const data = {
      intern: interns[0]._id,
      host: listing.user,
      listing: listing._id,
      startDate: moment.utc().add(6, "days"),
      endDate: moment.utc().add(20, "days"),
      price: 220,
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
        expect(res.body.error).toBe("you have to book at least 7 days in advance");
        done(err);
      });
  });
});
