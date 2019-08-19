const request = require("supertest");
const mongoose = require("mongoose");

const User = require("../../database/models/User");

const buildDB = require("./../../database/data/test/index");
const app = require("./../../app");

describe("Testing for get host profile route", () => {
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

  test("test with correct user id", (done) => {
    const loginData = {
      email: "mone@gmail.com",
      password: "123456",
    };
    request(app)
      .post("/api/user/login")
      .send(loginData)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async (error, resp) => {
        if (error) {
          done(error);
          return;
        }
        const token = resp.headers["set-cookie"][0].split(";")[0];
        const host = await User.findOne({ email: "adam@gmail.com" });

        request(app)
          .get(`/api/host/${host._id}`)
          .set("Cookie", [token])
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            expect(res).toBeDefined();
            expect(res.body).toBeDefined();
            expect(res.body.name).toBe(host.name);
            expect(res.body.listing).toBeDefined();
            expect(res.body.profile).toBeDefined();
            expect(res.body.reviews[0].message).toBeDefined();
            expect(res.body.reviews[0].from).toBeDefined();
            done(err);
          });
      });
  });

  test("test with incorrect user id", (done) => {
    const loginData = {
      email: "mone@gmail.com",
      password: "123456",
    };
    request(app)
      .post("/api/user/login")
      .send(loginData)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async (error, resp) => {
        if (error) {
          done(error);
          return;
        }
        const token = resp.headers["set-cookie"][0].split(";")[0];
        const data = { userId: "5ce66c1635c86b54fd6c732c" };

        request(app)
          .get(`/api/host/${data.userId}`)
          .set("Cookie", [token])
          .expect("Content-Type", /json/)
          .expect(404)
          .end((err, res) => {
            expect(res.body.error).toBeDefined();
            done(err);
          });
      });
  });
});
