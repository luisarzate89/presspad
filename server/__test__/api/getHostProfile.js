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

    request(app)
      .get(`/api/host/${host._id}`)
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
});
