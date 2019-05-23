const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("./../../database/data/test/index");
const app = require("./../../app");

const { API_SIGNUP_URL } = require("../../../client/src/constants/apiRoutes");

const OrgCodes = require("./../../database/models/OrgCodes");

describe("Testing for signup route", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("test correct intern details", async (done) => {
    const org = await OrgCodes.findOne();

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
        expect(res.body).toBeDefined();
        expect(res.body.email).toBe(data.userInfo.email);
        expect(res.body.name).toBe(data.userInfo.name);
        expect(res.body.password).toBe(undefined);
        done(err);
      });
  });
});
