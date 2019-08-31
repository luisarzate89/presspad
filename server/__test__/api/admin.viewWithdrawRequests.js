const request = require("supertest");
const mongoose = require("mongoose");

const User = require("../../database/models/User");
const { findAllWithdrawRequests } = require("../../database/queries/withdrawRequest/index");
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

  // tests user validation
  test("Admin is able to view all withdrawal requests", async (done) => {
    const admin = await User.findOne({ role: "admin" });
    const withdrawRequests = await findAllWithdrawRequests();
    const oneRequest = withdrawRequests[0];
    const loginData = {
      email: admin.email,
      password: "123456",
    }
    // login as admin
    request(app)
    .post("/api/user/login")
    .send(loginData)
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(error);
      const token = res.headers["set-cookie"][0].split(";")[0];
      expect(res).toBeDefined();
      expect(res.body.email).toBe(loginData.email);
      return request(app)
        .get("/api/withdraw-requests")
        .set("Cookie", [token])
        .expect(200)
        .expect("Content-Type", /json/)
        .end(async (error, response) => {
          if (error) return done(error);
          expect(response.body).toBeDefined();
          expect(Array.isArray(response.body)).toBe(true);
          expect(response.body[0].user.name).toBeDefined();
          return done();
        });
    });
  }, 30000);
  
  test("Other users are unable to view all withdrawal requests", async (done) => {
    const admin = await User.findOne({ role: "host" });
    const loginData = {
      email: admin.email,
      password: "123456",
    }
    // login as admin
    request(app)
    .post("/api/user/login")
    .send(loginData)
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(error);
      const token = res.headers["set-cookie"][0].split(";")[0];
      expect(res).toBeDefined();
      expect(res.body.email).toBe(loginData.email);
      return request(app)
        .get("/api/withdraw-requests")
        .set("Cookie", [token])
        .expect(403)
        .expect("Content-Type", /json/)
        .end(async (error, response) => {
          if (error) return done(error);
          expect(response.body).toBeDefined();
          expect(Array.isArray(response.body)).toBe(false);
          expect(response.body.message).toBeDefined();
          expect(response.body.message).toBe("Forbidden");
          return done();
        });
    });
  }, 30000);
});