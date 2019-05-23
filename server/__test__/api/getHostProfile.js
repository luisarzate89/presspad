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

  test("test with correct user id", async (done) => {
    const host = await User.findOne({ role: "host" });

    const data = { userId: host._id };

    request(app)
      .post("/api/host")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        expect(res.body).toBeDefined();
        expect(res.body[0]._id).toBeDefined();
        expect(res.body[0].email).toBe(host.email);
        expect(res.body[0].listing).toBeDefined();
        expect(res.body[0].profile).toBeDefined();
        expect(res.body[0].reviews).toBeDefined();
        done(err);
      });
  });

  test("test with incorrect user id", async (done) => {
    const data = { userId: "5ce66c1635c86b54fd6c732c" };

    request(app)
      .post("/api/host")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(404)
      .end((err, res) => {
        expect(res.body).toBeDefined();
        expect(res.body.error).toBe("Cannot find the profile you're looking for");
        done(err);
      });
  });

  test("test with no user id", async (done) => {
    request(app)
      .post("/api/host")
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        expect(err).toBeDefined();
        expect(res.body.error).toBe("error loading profile");
        done(err);
      });
  });
});
