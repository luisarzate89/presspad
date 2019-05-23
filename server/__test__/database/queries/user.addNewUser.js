const mongoose = require("mongoose");

const buildDB = require("../../../database/data/test");

const { addNewUser } = require("./../../../database/queries/user");
const { addOrg, findOrg } = require("./../../../database/queries/user/organisation");

const User = require("../../../database/models/User");
const Organisation = require("../../../database/models/Organisation");

describe("Test for add and find organisation queries", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test("Test addOrg", async (done) => {
    addOrg("Test Organisation").then((response) => {
      expect(response).toBeDefined();
      expect(response.name).toBe("Test Organisation");
      expect(response.code).toBeDefined();
      done();
    });
  });

  test("Test findOrg", async (done) => {
    const org = await Organisation.findOne();
    findOrg(org.code).then((foundOrg) => {
      expect(foundOrg).toBeDefined();
      expect(foundOrg.name).toBe(org.name);
      done();
    });
  });
});

describe("Test addNewUser query", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test("Test intern", async (done) => {
    const org = await Organisation.findOne();

    const userInfo = {
      email: "intern@test.com",
      name: "Ted Test",
      password: "a123456A",
      role: "intern",
      code: org.code,
    };

    addNewUser(userInfo).then((newUser) => {
      expect(newUser).toBeDefined();
      expect(newUser.email).toBe(userInfo.email);
      expect(newUser.organisation.id).toBe(org.id);
      done();
    });
  });

  test("Test host", async (done) => {
    const referralUser = await User.findOne({ role: "superhost" });

    const userInfo = {
      email: "host@test.com",
      name: "Ted Test",
      password: "a123456A",
      role: "host",
      referral: referralUser.id,
    };

    addNewUser(userInfo).then((newUser) => {
      expect(newUser).toBeDefined();
      expect(newUser.email).toBe(userInfo.email);
      expect(newUser.role).toBe(userInfo.role);
      done();
    });
  });

  test("Test organisation", async (done) => {
    const userInfo = {
      email: "organisation@test.com",
      name: "Ted Test",
      password: "a123456A",
      role: "organisation",
      organisation: "Test Media Inc",
    };

    addNewUser(userInfo).then((newUser) => {
      expect(newUser).toBeDefined();
      expect(newUser.email).toBe(userInfo.email);
      expect(newUser.role).toBe(userInfo.role);
      done();
    });
  });
});
