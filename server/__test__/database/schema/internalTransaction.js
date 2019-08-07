const mongoose = require("mongoose");

const User = require("../../../database/models/User");
const InternalTransaction = require("../../../database/models/InternalTransaction");
const buildDB = require("../../../database/data/test");

describe("Test InternalTransaction schema", () => {
  beforeAll(async (done) => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test("InternalTransaction schema should be defined", async () => {
    expect(InternalTransaction).toBeDefined();
  });

  test("should store internalTransactions schema correctly", async (done) => {
    const internalTransactions = await InternalTransaction.find();
    expect(internalTransactions).toHaveLength(11);
    done();
  });

  test("should store a new internalTransaction correctly", async (done) => {
    const host = await User.findOne({ role: "host" });
    const intern = await User.findOne({ role: "intern" });

    const newInternalTransaction = {
      user: intern._id,
      from: intern.account,
      to: host.account,
      amount: 900,
    };

    const storedTransaction = await InternalTransaction.create(newInternalTransaction);
    expect(storedTransaction).toBeDefined();
    expect(storedTransaction.to).toBe(host.account);
    done();
  });
});
