const mongoose = require("mongoose");

const User = require("../../../database/models/User");
const ExternalTransaction = require("../../../database/models/ExternalTransaction");
const buildDB = require("../../../database/data/test");

describe("Test ExternalTransaction schema", () => {
  beforeAll(async (done) => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test("ExternalTransaction schema should be defined", async () => {
    expect(ExternalTransaction).toBeDefined();
  });

  test("should store externalTransaction schema correctly", async (done) => {
    const externalTransaction = await ExternalTransaction.find();
    expect(externalTransaction).toHaveLength(8);
    done();
  });

  test("should store a new ExternalTransaction correctly", async (done) => {
    const orgAdmin = await User.findOne({ role: "organisation" });

    const newExternalTransaction = {
      user: orgAdmin._id,
      account: orgAdmin.account,
      amount: 900,
      type: "deposite",
    };

    const storedTransaction = await ExternalTransaction.create(newExternalTransaction);
    expect(storedTransaction).toBeDefined();
    expect(storedTransaction.account).toBe(orgAdmin.account);
    done();
  });
});
