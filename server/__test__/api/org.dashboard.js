const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("./../../database/data/test/index");
const app = require("./../../app");

const { API_ORGS_DASHBOARD_URL } = require("./../../../client/src/constants/apiRoutes");

describe("Testing for organisation dashboard data", () => {
  beforeAll(async (done) => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test("test with an organisation user's role", (done) => {
    const loginData = {
      email: "brian@bbc.co.uk",
      password: "123456",
    };

    request(app)
      .post("/api/user/login")
      .send(loginData)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async (err, res) => {
        const token = res.headers["set-cookie"][0].split(";")[0];

        request(app)
          .get(API_ORGS_DASHBOARD_URL)
          .set("Cookie", [token])
          .expect("Content-Type", /json/)
          .expect(200)
          .end((error, result) => {
            expect(result).toBeDefined();
            expect(result.body).toHaveLength(3);

            const [details, notifications, interns] = result.body;
            expect(details).toBeDefined();
            expect(details[0].name).toBe("BBC");

            expect(notifications).toBeDefined();
            expect(notifications).toHaveLength(2);
            expect(notifications[0].secondParty).toBeDefined();
            expect(notifications[0].user).toBeDefined();

            expect(interns).toBeDefined();
            done(error);
          });
      });
  });

  test("test unauthorized user", (done) => {
    const loginData = {
      email: "adam@gmail.com",
      password: "123456",
    };

    request(app)
      .post("/api/user/login")
      .send(loginData)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async (err, res) => {
        const token = res.headers["set-cookie"][0].split(";")[0];

        request(app)
          .get(API_ORGS_DASHBOARD_URL)
          .set("Cookie", [token])
          .expect("Content-Type", /json/)
          .expect(401)
          .end(done);
      });
  });
});
