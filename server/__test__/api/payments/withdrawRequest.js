const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("../../../database/data/test/index");
const app = require("../../../app");
const Account = require("../../../database/models/Account");
const User = require("../../../database/models/User");
const WithdrawRequest = require("../../../database/models/WithdrawRequest");

// API ROUTE
const { API_WITHDRAW_REQUEST_URL } = require("../../../../client/src/constants/apiRoutes");

describe("Testing for host makeing withdraw request", () => {
  beforeAll(async (done) => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test("test with correct details", (done) => {
    // host credentials
    const loginData = {
      email: "adam@gmail.com",
      password: "123456",
    };

    request(app)
      .post("/api/user/login")
      .send(loginData)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async (err, res) => {
        const token = res.headers["set-cookie"][0].split(";")[0];
        // host wants to donate
        const adam = await User.findOne({ email: "adam@gmail.com" });
        // donated account
        const adamAccountBefore = await Account.findById(adam.account);

        const amount = adamAccountBefore.currentBalance;

        const data = {
          amount,
          bankName: "bankName",
          bankSortCode: "bankSortCode",
          bankNumber: "bankNumber",
        };
        const withdrawRequestsBefore = await WithdrawRequest.find();

        request(app)
          .post(API_WITHDRAW_REQUEST_URL)
          .set("Cookie", [token])
          .send(data)
          .expect("Content-Type", /json/)
          .expect(200)
          .end(async (error, result) => {
            if (error) return done(error);
            expect(result).toBeDefined();
            expect(error).toBeFalsy();
            const adamAccountAfter = await Account.findById(adam.account);

            expect(adamAccountAfter.currentBalance).toBe(adamAccountBefore.currentBalance);

            const withdrawRequestsAfter = await WithdrawRequest.find();
            expect(withdrawRequestsAfter.length).toBe(withdrawRequestsBefore.length + 1);
            return done();
          });
      });
  });
  test("test with incorrect details", (done) => {
    // host credentials
    const loginData = {
      email: "adam@gmail.com",
      password: "123456",
    };

    request(app)
      .post("/api/user/login")
      .send(loginData)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(async (err, res) => {
        const token = res.headers["set-cookie"][0].split(";")[0];
        // host wants to donate
        const adam = await User.findOne({ email: "adam@gmail.com" });

        // donated account
        const adamAccountBefore = await Account.findById(adam.account);

        const amount = adamAccountBefore.currentBalance + 500;

        const withdrawRequestsBefore = await WithdrawRequest.find();

        const data = {
          amount,
        };

        request(app)
          .post(API_WITHDRAW_REQUEST_URL)
          .set("Cookie", [token])
          .send(data)
          .expect("Content-Type", /json/)
          .expect(500)
          .end(async (error) => {
            expect(error).toBeDefined();

            // must be no changes
            const withdrawRequestsAfter = await WithdrawRequest.find();
            expect(withdrawRequestsAfter.length).toBe(withdrawRequestsBefore.length);
            return done();
          });
      });
  });
});
