const mongoose = require("mongoose");

const buildDB = require("../../../database/data/test/index");

// get query
const { createExternalTransaction } = require("../../../database/queries/payments");

// get models
const User = require("../../../database/models/User");
const Account = require("../../../database/models/Account");

describe("Tests for createExternalTransaction queries", () => {
  beforeAll(async (done) => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(async (done) => {
    await mongoose.disconnect();
    done();
  });

  test("Test createExternalTransactions deposite", async (done) => {
    const [user] = await User.find({ email: "mone@gmail.com" });
    const [account] = await Account.find({ _id: user.account });

    const amount = 10000;
    const type = "deposite";
    const stripeInfo = {
      id: "pi_1FBILzDfm5MEAc97LLGJLzqi",
      object: "payment_intent",
      amount: 10000,
      amount_received: 10000,
      capture_method: "automatic",
      currency: "gbp",
      payment_method: "pm_1FBILyDfm5MEAc97jsEDhUZW",
      payment_method_options: { card: { request_three_d_secure: "automatic" } },
      payment_method_types: ["card"],
      receipt_email: null,
      review: null,
      status: "succeeded",
    };

    const result = await createExternalTransaction(user._id, account._id, amount, stripeInfo, type);

    const { income: oldIncome, currentBalance: oldCurrentBalance } = account;
    const [{
      income: newIncome, currentBalance: newCurrentBalance,
    }] = await Account.find({ _id: user.account });

    expect(result).toBeDefined();
    expect(result.amount).toBe(amount);
    expect(newIncome).toBe(oldIncome + amount);
    expect(newCurrentBalance).toBe(oldCurrentBalance + amount);
    done();
  });

  test("Test createExternalTransactions withdraw", async (done) => {
    // pressPad admin
    const [user] = await User.find({ role: "admin" });
    const [account] = await Account.find({ _id: user.account });
    const { income: oldIncome, currentBalance: oldCurrentBalance } = account;

    const amount = 10000;
    const type = "withdraw";
    const stripeInfo = {
      id: "pi_1FBILzDfm5MEAc97LLGJLzqi",
      object: "payment_intent",
      amount: 10000,
      amount_received: 10000,
      capture_method: "automatic",
      currency: "gbp",
      payment_method: "pm_1FBILyDfm5MEAc97jsEDhUZW",
      payment_method_options: { card: { request_three_d_secure: "automatic" } },
      payment_method_types: ["card"],
      receipt_email: null,
      review: null,
      status: "succeeded",
    };

    const result = await createExternalTransaction(user._id, account._id, amount, stripeInfo, type);

    const [{
      income: newIncome, currentBalance: newCurrentBalance,
    }] = await Account.find({ _id: user.account });

    expect(result).toBeDefined();
    expect(result.amount).toBe(amount);
    expect(newIncome).toBe(oldIncome); // income shouldn't be touched
    expect(newCurrentBalance).toBe(oldCurrentBalance - amount);
    done();
  });

  test("Test createExternalTransactions withdraw fail", async (done) => {
    // pressPad admin
    const [user] = await User.find({ role: "admin" });
    const [account] = await Account.find({ _id: user.account });

    const amount = 100000000;
    const type = "withdraw";
    const stripeInfo = {
      id: "pi_1FBILzDfm5MEAc97LLGJLzqi",
      object: "payment_intent",
      amount: 10000,
      amount_received: 10000,
      capture_method: "automatic",
      currency: "gbp",
      payment_method: "pm_1FBILyDfm5MEAc97jsEDhUZW",
      payment_method_options: { card: { request_three_d_secure: "automatic" } },
      payment_method_types: ["card"],
      receipt_email: null,
      review: null,
      status: "succeeded",
    };

    try {
      await createExternalTransaction(user._id, account._id, amount, stripeInfo, type);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe("Account doesn't have sufficent balance");
      done();
    }
  });
});
