const request = require("supertest");
const mongoose = require("mongoose");

const buildDB = require("./../../../database/data/test/index");
const app = require("./../../../app");
const Account = require("./../../../database/models/Account");
const User = require("./../../../database/models/User");
const InternalTransaction = require("./../../../database/models/InternalTransaction");

// API ROUTE
const { API_DONATION_URL } = require("./../../../../client/src/constants/apiRoutes");

describe("Testing for host donate to presspad account route", () => {
  beforeAll(async (done) => {
    // 1 minute for each test becuase it runs on atlas
    jest.setTimeout(60000);
    // build dummy data
    await buildDB(true);
    done();
  });

  afterAll(async (done) => {
    await mongoose.disconnect();
    done();
  });
  console.log("henlo")
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
        // presspad admin
        const admin = await User.findOne({ role: "admin" });
        // presspad account
        const presspadAccountBefore = await Account.findById(admin.account);
        // donated account
        const adamAccountBefore = await Account.findById(adam.account);

        const amount = adamAccountBefore.currentBalance;

        const data = {
          amount,
        };

        request(app)
          .post(API_DONATION_URL)
          .set("Cookie", [token])
          .send(data)
          .expect("Content-Type", /json/)
          .expect(200)
          .end(async (error, result) => {
            if (error) return done(error);
            expect(result).toBeDefined();
            expect(error).toBeFalsy();
            const presspadAccountAfter = await Account.findById(admin.account);
            const adamAccountAfter = await Account.findById(adam.account);

            expect(adamAccountAfter.currentBalance).toBe(0);
            expect(presspadAccountAfter.currentBalance)
              .toBe(presspadAccountBefore.currentBalance + amount);

            const transaction = await InternalTransaction.findOne({
              user: adam._id, from: adam.account, to: admin.account, amount,
            });
            expect(transaction).toBeDefined();
            expect(transaction).toBeTruthy();

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
        // presspad admin
        const admin = await User.findOne({ role: "admin" });
        // presspad account
        const presspadAccountBefore = await Account.findById(admin.account);
        // donated account
        const adamAccountBefore = await Account.findById(adam.account);

        const amount = adamAccountBefore.currentBalance + 500;

        const data = {
          amount,
        };

        request(app)
          .post(API_DONATION_URL)
          .set("Cookie", [token])
          .send(data)
          .expect("Content-Type", /json/)
          .expect(500)
          .end(async (error) => {
            expect(error).toBeDefined();
            const presspadAccountAfter = await Account.findById(admin.account);
            const adamAccountAfter = await Account.findById(adam.account);
            // must be no changes
            expect(adamAccountAfter.currentBalance).toBe(adamAccountBefore.currentBalance);
            expect(presspadAccountAfter.currentBalance)
              .toBe(presspadAccountBefore.currentBalance);
            const transaction = await InternalTransaction.findOne({
              user: adam._id, from: adam.account, to: admin.account, amount,
            });
            expect(transaction).toBeFalsy();
            return done(error);
          });
      });
  });
});
