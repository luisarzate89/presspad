const request = require("supertest");
const mongoose = require("mongoose");

const User = require("../../database/models/User");

const buildDB = require("./../../database/data/test/index");
const app = require("./../../app");

// API ROUTE
const { API_ADMIN_STATS_URL } = require("./../../../client/src/constants/apiRoutes");

describe("Testing for get host profile route", () => {
  beforeAll(async (done) => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test("test with correct user id", (done) => {
    // must be an admin user
    const loginData = {
      email: "mark@presspad.co.uk",
      password: "123456",
    };

    request(app)
      .post("/api/user/login")
      .send(loginData)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async (err, res) => {
        const token = res.headers["set-cookie"][0].split(";")[0];
        const data = { userType: "client" };

        request(app)
          .post(API_ADMIN_STATS_URL)
          .set("Cookie", [token])
          .send(data)
          .expect("Content-Type", /json/)
          .expect(200)
          .end((error, result) => {
            expect(result).toBeDefined();
            expect(result.body).toBeDefined();
            expect(result.body[0].key).toBe(1);
            expect(result.body[0].organisation).toBeDefined();
            expect(result.body[0].currentlyHosted).toBeDefined();
            expect(result.body[0].creditsSpent).toBeDefined();
            done(error);
          });
      });
  });
});
