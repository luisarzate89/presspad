const mongoose = require("mongoose");

const buildDB = require("../../../database/data/test");

const { addOrg, findOrg, addNewUser } = require("./../../../database/queries/user");

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

// describe("Test for findByEmail query", () => {
//   beforeAll(async () => {
//     // build dummy data
//     await buildDB();
//   });

//   afterAll(() => {
//     mongoose.disconnect();
//   });

//   test("Test with correct eamil", async (done) => {
//     const user = await User.findOne();
//     findByEmail(user.email).then((foundUser) => {
//       expect(foundUser).toBeDefined();
//       expect(foundUser.email).toBe(user.email);
//       done();
//     });
//   });

//   test("Test with email that doesn't exist", async (done) => {
//     findByEmail("wrong@eamil.com").then((foundUser) => {
//       expect(foundUser).toBeNull();
//       done();
//     });
//   });
// });
