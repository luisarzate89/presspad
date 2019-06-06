const mongoose = require("mongoose");
const buildDB = require("../../../database/data/test/index");

// get query
const { searchProfiles } = require("../../../database/queries/profile/searchProfiles");

describe("Tests for hostProfile queries", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test("Get London listings when only city entered", async (done) => {
    const data = { city: "London" };

    await searchProfiles(data).then((results) => {
      expect(results).toBeDefined();
      expect(results.length).toBe(3);
      expect(results[0].address.city).toBe("London");
    });
    done();
  });

  test("Get no listings when only city entered", async (done) => {
    const data = { city: "Birmingham" };

    await searchProfiles(data).then((results) => {
      expect(results).toBeDefined();
      expect(results.length).toBe(0);
    });
    done();
  });
});
