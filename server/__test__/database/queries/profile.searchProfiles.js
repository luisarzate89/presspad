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

  test("Get listings when only date entered and available dates selected", async (done) => {
    const data = { startDate: "2020-02-12", endDate: "2020-02-15" };

    await searchProfiles(data).then((results) => {
      expect(results).toBeDefined();
      expect(results.length).toBe(3);
    });
    done();
  });

  test("Get listings when only date entered and available dates selected", async (done) => {
    const data = { startDate: "2019-06-05", endDate: "2019-06-08" };

    await searchProfiles(data).then((results) => {
      expect(results).toBeDefined();
      expect(results.length).toBe(2);
    });
    done();
  });

  test("Get no listings when only date entered and unavailable dates selected", async (done) => {
    const data = { startDate: "2020-12-13", endDate: "2020-12-15" };

    await searchProfiles(data).then((results) => {
      expect(results).toBeDefined();
      expect(results.length).toBe(0);
    });
    done();
  });

  test("Get listings with city and dates", async (done) => {
    const data = { city: "London", startDate: "2020-02-12", endDate: "2020-02-15" };

    await searchProfiles(data).then((results) => {
      expect(results).toBeDefined();
      expect(results.length).toBe(2);
      expect(results[0].address.city).toBe("London");
      expect(results[1].address.city).toBe("London");
    });
    done();
  });

  test("Get no listings with city and dates if city not found", async (done) => {
    const data = { city: "Birmingham", startDate: "2020-02-12", endDate: "2020-02-15" };

    await searchProfiles(data).then((results) => {
      expect(results).toBeDefined();
      expect(results.length).toBe(0);
    });
    done();
  });

  test("Get no listings with city and dates if dates not found", async (done) => {
    const data = { city: "London", startDate: "2020-12-13", endDate: "2020-12-15" };

    await searchProfiles(data).then((results) => {
      expect(results).toBeDefined();
      expect(results.length).toBe(0);
    });
    done();
  });

  test("Get no listings with city and dates if dates and city not found", async (done) => {
    const data = { city: "Birmingham", startDate: "2020-12-13", endDate: "2020-12-15" };

    await searchProfiles(data).then((results) => {
      expect(results).toBeDefined();
      expect(results.length).toBe(0);
    });
    done();
  });
});
