const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("./../../database/data/test/index");
const app = require("./../../app");

const { API_VERIFY_PROFILE_URL } = require("./../../../client/src/constants/apiRoutes");

const Profile = require("./../../database/models/Profile");

describe("Testing to approve and reject profiles", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("test succesful approval of profile", (done) => {
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

        const profile = await Profile.findOne({ verified: false });

        const data = { verify: true, profileId: profile.id };

        request(app)
          .post(API_VERIFY_PROFILE_URL)
          .set("Cookie", [token])
          .send(data)
          .expect("Content-Type", /json/)
          .expect(200)
          .end(async (error, result) => {
            expect(result).toBeDefined();
            expect(result.body).toBe("success");
            const updatedProfile = await Profile.findById(profile.id);
            expect(updatedProfile.verified).toBe(true);
            done(err);
          });
      });
  });

  test("test succesful unapproval of profile", (done) => {
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

        const profile = await Profile.findOne({ verified: true });

        const data = { verify: false, profileId: profile.id };

        request(app)
          .post(API_VERIFY_PROFILE_URL)
          .set("Cookie", [token])
          .send(data)
          .expect("Content-Type", /json/)
          .expect(200)
          .end(async (error, result) => {
            expect(result).toBeDefined();
            expect(result.body).toBe("success");
            const updatedProfile = await Profile.findById(profile.id);
            expect(updatedProfile.verified).toBe(false);
            done(err);
          });
      });
  });
});
