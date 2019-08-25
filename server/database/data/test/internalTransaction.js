const InternalTransaction = require("./../../models/InternalTransaction");
const User = require("./../../models/User");
const Organisation = require("../../models/Organisation");


module.exports = async () => {
  const BBC = await Organisation.findOne({ name: "BBC" });

  const admin = await User.findOne({ role: "admin" }).sort({ name: 1 });
  const [host1, host2] = await User.find({ role: "host" }).sort({ name: 1 });
  const [intern1, intern2, intern4] = await User.find({ role: "intern" }).sort({ name: 1 });
  const orgAdmin1 = await User.findOne({ role: "organisation", organisation: BBC._id }).sort({ name: 1 });

  const internalTransactions = [
    // intern to host
    {
      user: intern1._id,
      from: intern1.account,
      to: host1.account,
      amount: 900,
    },
    {
      user: intern1._id,
      from: intern1.account,
      to: host2.account,
      amount: 1400,
    },
    {
      user: intern2._id,
      from: intern2.account,
      to: host1.account,
      amount: 1000,
    },
    {
      user: intern2._id,
      from: intern2.account,
      to: host2.account,
      amount: 700,
    },
    // coupons transactions
    // from organsisation to host
    {
      user: orgAdmin1._id,
      // this is the account for the org not the user
      from: orgAdmin1.account,
      to: intern1.account,
      amount: 200,
    },
    {
      user: orgAdmin1._id,
      from: orgAdmin1.account,
      to: intern2.account,
      amount: 300,
    },
    {
      user: orgAdmin1._id,
      from: orgAdmin1.account,
      to: intern4.account,
      amount: 350,
    },
    {
      user: orgAdmin1._id,
      from: orgAdmin1.account,
      to: intern1.account,
      amount: 250,
    },
    // hosts donations
    {
      user: host1._id,
      from: host1.account,
      // to presspad account
      to: admin.account,
      amount: 920,
    },
    {
      user: host1._id,
      from: host1.account,
      // to presspad account
      to: admin.account,
      amount: 1200,
    },
    {
      user: host2._id,
      from: host2.account,
      // to presspad account
      to: admin.account,
      amount: 500,
    },
  ];
  await InternalTransaction.create(internalTransactions);
};
