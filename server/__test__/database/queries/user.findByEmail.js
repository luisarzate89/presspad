const mongoose = require("mongoose");

const buildDB = require("../../../database/data/test");

const { findByEmail } = require("./../../../database/queries/user");

const User = require("../../../database/models/User");

describe("Test for findByEmail query", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test("Test with correct eamil", async (done) => {
    const user = await User.findOne();
    findByEmail(user.email).then((foundUser) => {
      expect(foundUser).toBeDefined();
      expect(foundUser.email).toBe(user.email);
      done();
    });
  });

  test("Test with email that doesn't exist", async (done) => {
    findByEmail("wrong@eamil.com").then((foundUser) => {
      expect(foundUser).toBeNull();
      done();
    });
  });
});
