const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("./../../database/data/test/index");
const app = require("./../../app");

describe("Tests get profile data with the image urls form google cloud", () => {
  beforeAll(async (done) => {
    await buildDB();
    done();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  const intern = {
    email: "mone@gmail.com",
    password: "123456",
  };

  const host = {
    email: "simon@gmail.com",
    password: "123456",
  };

  test("tests get Intern profile successfully", async (done) => {
    request(app)
      .post("/api/user/login")
      .send(intern)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((error, response) => {
        const token = response.headers["set-cookie"][0].split(";")[0];
        if (error) return done(error);

        // Request should get the intern profile
        // the profileImage must contain a url
        // from google cloud
        return request(app)
          .get("/api/my-profile")
          .set("Cookie", [token])
          .expect(200)
          .expect("Content-Type", /json/)
          .end(async (err, res) => {
            if (err) return done(err);
            expect(res).toBeDefined();
            expect(res.body).toBeDefined();

            const { url } = res.body.profile.profileImage;
            expect(url).toBeTruthy();
            expect(url).toMatch(/https:\/\/storage.googleapis.com\/*\/*.*/);
            expect(res.body.profile.jobTitle).toBe("journalist");
            return done();
          });
      });
  }, 30000);


  test("tests get Host profile successfully", async (done) => {
    request(app)
      .post("/api/user/login")
      .send(host)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((error, response) => {
        const token = response.headers["set-cookie"][0].split(";")[0];
        if (error) return done(error);

        return request(app)
          .get("/api/my-profile")
          .set("Cookie", [token])
          .expect(200)
          .expect("Content-Type", /json/)
          .end((err, res) => {
            if (err) return done(err);
            expect(res).toBeDefined();
            expect(res.body).toBeDefined();

            const { profile, listing } = res.body;
            expect(profile).toBeTruthy();
            expect(listing).toBeTruthy();
            expect(listing.photos).toHaveLength(0);
            expect(listing.address.street).toBe("28 Test Road");
            return done();
          });
      });
  }, 30000);
});
