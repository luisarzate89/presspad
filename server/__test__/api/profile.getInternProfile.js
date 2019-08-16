const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("../../database/data/test/index");
const app = require("../../app");

describe("Tests get intern's profile data", () => {
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


  test("tests get Intern profile successfully", async (done) => {
    request(app)
      .post("/api/user/login")
      .send(intern)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((error, response) => {
        const token = response.headers["set-cookie"][0].split(";")[0];
        if (error) return done(error);
        const { id } = response.body;
        // Request should get the intern profile
        // the profileImage must contain a url
        // from google cloud
        return request(app)
          .get(`/api/interns/${id}/profile/?expand=bookings&expand=reviews`)
          .set("Cookie", [token])
          .expect(200)
          .expect("Content-Type", /json/)
          .end(async (err, res) => {
            if (err) return done(err);
            expect(res).toBeDefined();
            expect(res.body).toBeDefined();

            const { userInfo, bookingsWithReviews } = res.body;
            expect(userInfo).toBeDefined();
            expect(userInfo.profile).toBeDefined();
            expect(bookingsWithReviews).toBeDefined();

            return done();
          });
      });
  });
});
