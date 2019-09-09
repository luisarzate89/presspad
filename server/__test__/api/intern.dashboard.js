const request = require("supertest");
const mongoose = require("mongoose");

const app = require("./../../app");
const buildDB = require("../../database/data/test/index");

const { API_INTERN_DASHBOARD_URL } = require("../../../client/src/constants/apiRoutes");

describe("Testing for intern dashboard route", () => {
  beforeAll(async (done) => {
    // build dummy data
    try {
      await buildDB();
      done();
    } catch (err) {
      done(err);
    }
  });

  afterAll(() => mongoose.disconnect());

  test("test with an intern user's role", (done) => {
    const loginData = {
      email: "mone@gmail.com",
      password: "123456",
    };
    request(app)
      .post("/api/user/login")
      .send(loginData)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async (err, res) => {
        if (err) {
          done(err);
          return;
        }
        const token = res.headers["set-cookie"][0].split(";")[0];

        request(app)
          .get(API_INTERN_DASHBOARD_URL)
          .set("Cookie", [token])
          .expect(200)
          .end((error, result) => {
            expect(result).toBeDefined();
            const {
              name, profile, notifications, installments, bookings,
            } = result.body.data;


            expect(name).toBe("Mone Dupree");
            expect(profile).toBeDefined();
            expect(profile.profileImage.url).toMatch(/https:\/\/storage.googleapis.com\/*\/*.*/);

            expect(notifications).toBeDefined();
            expect(notifications).toHaveLength(2);
            expect(notifications[0].secondParty).toBeDefined();
            expect(notifications[0].user).toBeDefined();

            expect(installments).toBeDefined();
            expect(installments).toHaveLength(3);
            expect(installments[0].booking).toBeDefined();
            expect(installments[0].amount).toBeDefined();
            expect(installments[0].dueDate).toBeDefined();

            expect(bookings).toBeDefined();
            expect(bookings).toHaveLength(4);
            expect(bookings[0].status).toBeDefined();
            expect(bookings[0].startDate).toBeDefined();
            expect(bookings[0].endDate).toBeDefined();
            expect(bookings[0].host).toBeDefined();
            expect(bookings[0].host.name).toBeDefined();
            expect(bookings[0].host.profile).toBeDefined();
            done();
          });
      });
  });
});
