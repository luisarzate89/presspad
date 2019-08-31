const mongoose = require("mongoose");

const buildDB = require("../../../database/data/test/index");

// get query
const { createInternalTransaction } = require("../../../database/queries/payments");

// get models
const User = require("../../../database/models/User");
const Account = require("../../../database/models/Account");

describe("Tests for createInternalTransactions queries", () => {
  beforeAll(async (done) => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(async (done) => {
    await mongoose.disconnect();
    done();
  });

  test("Test createInternalTransaction Intern paying Host - type: installment", async (done) => {
    const [intern] = await User.find({ email: "mone@gmail.com" });
    const [host] = await User.find({ email: "hilda@bbc.co.uk" });

    // add to intern currentBalance
    await Account.updateOne({ _id: intern.account }, { currentBalance: 500 });

    const [internAccount] = await Account.find({ _id: intern.account });
    const [hostAccount] = await Account.find({ _id: host.account });

    const { currentBalance: oldInternCurrentBalance } = internAccount;
    const { currentBalance: oldHostCurrentBalance } = hostAccount;

    const amount = 500;
    const type = "installment";

    const result = await createInternalTransaction(
      intern._id, intern.account, host.account, amount, type,
    );
    const [newInternAccount] = await Account.find({ _id: intern.account });
    const [newHostAccount] = await Account.find({ _id: host.account });

    const { currentBalance: newInternCurrentBalance } = newInternAccount;
    const { currentBalance: newHostCurrentBalance } = newHostAccount;

    expect(result).toBeDefined();
    expect(oldInternCurrentBalance).toBe(newInternCurrentBalance + amount);
    expect(oldHostCurrentBalance).toBe(newHostCurrentBalance - amount);
    done();
  });

  test("Test createInternalTransaction intern using a copoun - type: couponTransaction", async (done) => {
    const [org] = await User.find({ email: "michael@financialtimes.co.uk" });
    const [host] = await User.find({ email: "hilda@bbc.co.uk" });

    const [orgAccount] = await Account.find({ _id: org.account });
    const { couponsValue: oldOrgCouponsValue } = orgAccount;

    const [hostAccount] = await Account.find({ _id: host.account });
    const { currentBalance: oldHostCurrentBalance } = hostAccount;

    const amount = 500;
    const type = "couponTransaction";

    const result = await createInternalTransaction(
      org._id, org.account, host.account, amount, type,
    );
    const [newOrgAccount] = await Account.find({ _id: org.account });
    const [newHostAccount] = await Account.find({ _id: host.account });

    const { couponsValue: newOrgCouponsValue } = newOrgAccount;
    const { currentBalance: newHostCurrentBalance } = newHostAccount;

    expect(result).toBeDefined();
    expect(oldOrgCouponsValue).toBe(newOrgCouponsValue + amount);
    expect(oldHostCurrentBalance).toBe(newHostCurrentBalance - amount);
    done();
  });

  test("Test createInternalTransaction host donating to pressPad - type: donation", async (done) => {
    const [pressPad] = await User.find({ role: "admin" });
    const [host] = await User.find({ email: "hilda@bbc.co.uk" });

    const [hostAccount] = await Account.find({ _id: host.account });
    const { currentBalance: oldHostCurrentBalance, donation: oldHostDonation } = hostAccount;

    const amount = 500;
    const type = "donation";

    const result = await createInternalTransaction(
      host._id, host.account, pressPad.account, amount, type,
    );
    const [newHostAccount] = await Account.find({ _id: host.account });
    const { currentBalance: newHostCurrentBalance, donation: newHostDonation } = newHostAccount;

    expect(result).toBeDefined();
    expect(oldHostCurrentBalance).toBe(newHostCurrentBalance + amount);
    expect(oldHostDonation).toBe(newHostDonation - amount);
    done();
  });
});
