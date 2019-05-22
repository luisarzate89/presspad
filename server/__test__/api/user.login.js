const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("./../../database/data/test/index");
const app = require("./../../app");

describe("Testing for login route", () => {
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

  test("test with correct email", (done) => {
    const data = {
      email: "michael@financialtimes.co.uk",
      password: "123456",
    };

    request(app)
      .post("/api/user/login")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        expect(res).toBeDefined();
        // expect(res.body.id).toBeDefined();
        // expect(res.body.email).toBe(data.email);
        expect(res.headers["set-cookie"][0]).toMatch("token");
        done(err);
      });
  });

  test("test with invalid request email", (done) => {
    const data = {
      email: "Wrong@email.com",
      password: "123456",
    };

    request(app)
      .post("/api/user/login")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(401)
      .end((err, res) => {
        expect(res.body.error).toMatch("Login failed. User does not exist");
        done(err);
      });
  });

  test("test with invalid request password", (done) => {
    const data = {
      email: "michael@financialtimes.co.uk",
      password: "123456563322",
    };

    request(app)
      .post("/api/user/login")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(401)
      .end((err, res) => {
        expect(res.body.error).toMatch("Login failed. Email or password cannot be recognised");
        done(err);
      });
  });
});
