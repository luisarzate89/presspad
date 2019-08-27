const mongoose = require("mongoose");

const buildDB = require("../../../database/data/test");

const { getInternStatus } = require("./../../../database/queries/user");

const User = require("../../../database/models/User");

describe("Test for user getIntern status query", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test("Return the interns status", async (done) => {
    const intern = await User.findOne({ role: "intern", name: "Mone Dupree" });

    getInternStatus(intern._id).then((res) => {
      expect(res).toBeDefined();
      expect(res[0].status).toBeDefined();
      done();
    });
  });

  test("Return empty array if id not found", (done) => {
    getInternStatus("3d0a15fc6ec988337cbfef2c").then((res) => {
      expect(res).toBeDefined();
      expect(res.length).toBe(0);
      done();
    });
  });
});
