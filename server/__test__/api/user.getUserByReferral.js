const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("./../../database/data/test/index");
const app = require("./../../app");

const { API_CHECK_REFERRAL_URL } = require("../../../client/src/constants/apiRoutes");

const User = require("./../../database/models/User");

describe("Testing for signup route", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("test get referral details", async (done) => {
    const userDetails = await User.findOne({ role: "superhost" });

    const data = {
      referralId: userDetails.id,
    };

    request(app)
      .post(API_CHECK_REFERRAL_URL)
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();
        expect(res.body.name).toBe(userDetails.name);
        done(err);
      });
  });

  test("test get incorrect referral details", async (done) => {
    const data = {
      referralId: "11111111",
    };

    request(app)
      .post(API_CHECK_REFERRAL_URL)
      .send(data)
      .expect("Content-Type", /json/)
      .expect(500)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body.error).toBeDefined();
        done(err);
      });
  });
});
