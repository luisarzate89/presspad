const mongoose = require("mongoose");

const User = require("../../../database/models/User");
const Profile = require("../../../database/models/Profile");
const buildDB = require("../../../database/data/test");

describe("Test Profile schema", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test("Profile schema should be defined", async () => {
    expect(User).toBeDefined();
  });

  test("should store Profile schema correctly", async (done) => {
    const profiles = await Profile.find();
    expect(profiles).toHaveLength(6);
    done();
  });
});
