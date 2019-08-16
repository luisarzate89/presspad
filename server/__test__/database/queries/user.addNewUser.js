const mongoose = require("mongoose");

const buildDB = require("../../../database/data/test");

const { addNewUser } = require("./../../../database/queries/user");
const { addOrg, checkCode, deleteCode } = require("./../../../database/queries/user/organisation");

const User = require("../../../database/models/User");
const Organisation = require("../../../database/models/Organisation");
const Account = require("../../../database/models/Account");

const OrgCode = require("../../../database/models/OrgCodes");

describe("Test for add and find organisation queries", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test("Test addOrg", async (done) => {
    const account = await Account.create({});
    addOrg("Test Organisation", "logo", account._id).then((response) => {
      expect(response).toBeDefined();
      expect(response.name).toBe("Test Organisation");
      done();
    });
  });

  test("Test checkCode", async (done) => {
    const orgCode = await OrgCode.findOne();
    checkCode(orgCode.code).then((foundOrgCode) => {
      expect(foundOrgCode).toBeDefined();
      expect(foundOrgCode.organisation).toBeDefined();
      done();
    });
  });

  test("Test deleteCode", async (done) => {
    const orgCode = await OrgCode.findOne();
    deleteCode(orgCode.code).then((deletedCode) => {
      expect(deletedCode).toBeDefined();
      expect(deletedCode.deletedCount).toBe(1);
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
      organisation: org,
    };

    addNewUser(userInfo).then((newUser) => {
      expect(newUser).toBeDefined();
      expect(newUser.email).toBe(userInfo.email);
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
