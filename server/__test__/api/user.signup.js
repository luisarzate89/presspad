const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("./../../database/data/test/index");
const app = require("./../../app");

const { API_SIGNUP_URL } = require("../../../client/src/constants/apiRoutes");

const Organisation = require("./../../database/models/Organisation");

describe("Testing for signup route", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("test correct intern details", async (done) => {
    const org = await Organisation.findOne();

    const data = {
      userInfo: {
        email: "intern@test.com",
        name: "Ted Test",
        password: "a123456A",
        role: "intern",
        code: org.code,
      },
    };

    request(app)
      .post(API_SIGNUP_URL)
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBe("hello");
        done(err);
      });
  });
});
