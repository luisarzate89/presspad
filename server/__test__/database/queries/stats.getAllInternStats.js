const mongoose = require("mongoose");

const buildDB = require("../../../database/data/test");

const { getAllInternStats } = require("../../../database/queries/stats/getAllInternStats");

const User = require("../../../database/models/User");
const Organisation = require("../../../database/models/Organisation");
const OrgCode = require("../../../database/models/OrgCodes");

describe("Test get all client stats query", () => {
  beforeAll(async (done) => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test("Test get stats", async (done) => {
    getAllInternStats().then((response) => {
      expect(response).toBeDefined();
      expect(response).toBe("hello");
      done();
    });
  });
});
