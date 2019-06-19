const mongoose = require("mongoose");

const buildDB = require("../../../database/data/test");

const { getAllClientStats } = require("../../../database/queries/stats/getAllClientStats");

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
    getAllClientStats().then((response) => {
      expect(response).toBeDefined();
      expect(response[0].interns).toBeDefined();
      expect(response[0].name).toBeDefined();
      expect(response[0].userDetails.plan).toBeDefined();
      done();
    });
  });
});
