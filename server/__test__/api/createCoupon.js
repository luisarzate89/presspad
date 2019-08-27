const request = require("supertest");
const mongoose = require("mongoose");

const User = require("../../database/models/User");
const Coupon = require("../../database/models/Coupon");
const Account = require("../../database/models/Account");

const buildDB = require("./../../database/data/test/index");
const app = require("./../../app");

describe("Testing for create Coupon route", () => {
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


  test("test to create new coupon with valid data with intern that has an account", async (done) => {
    const orgAdmin = await User.findOne({ email: "michael@financialtimes.co.uk" });

    const orgAccountBefore = await Account.findById(orgAdmin.account);

    const loginData = {
      email: "michael@financialtimes.co.uk",
      password: "123456",
    };

    const intern = await User.findOne({ role: "intern" });

    const data = {
      internName: intern._id,
      discountRate: 50,
      // coupon for 10 days = 150 + 3 * 20 = 210
      startDate: Date.now() + 20 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
      intern: intern._id,
    };

    request(app)
      .post("/api/user/login")
      .send(loginData)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((error, response) => {
        const token = response.headers["set-cookie"][0].split(";")[0];
        if (error) return done(error);

        // should create new coupon
        return request(app)
          .post("/api/coupons")
          .send(data)
          .set("Cookie", [token])
          .expect(200)
          .expect("Content-Type", /json/)
          .end(async (err, res) => {
            if (err) return done(err);

            const newCoupon = await Coupon.findOne({ code: res.body.code });
            const orgAccountAfter = await Account.findById(orgAdmin.account);

            // coupon for 10 days = 150 + 3 * 20 = 210
            expect(res).toBeDefined();
            expect(res.body.code).toBeDefined();
            expect(newCoupon.days).toBe(10);
            expect(orgAccountAfter.currentBalance).toBe(orgAccountBefore.currentBalance - 210);
            expect(orgAccountAfter.couponsValue).toBe(orgAccountBefore.couponsValue + 210);

            return done();
          });
      });
  });
});
