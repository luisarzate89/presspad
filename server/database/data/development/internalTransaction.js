const InternalTransaction = require("./../../models/InternalTransaction");
const User = require("./../../models/User");

module.exports = async () => {
  const users = await User.find();
  const [
    admin,
    orgAdmin1,,,,
    host1,
    host2,,,,
    intern1,
    intern2,,
    intern4,
  ] = users;

  const internalTransactions = [
    // intern to host
    {
      user: intern1._id,
      from: intern1.account,
      to: host1.account,
      amount: 900,
      type: "installment",
    },
    {
      user: intern1._id,
      from: intern1.account,
      to: host2.account,
      amount: 1200,
      type: "installment",
    },
    {
      user: intern2._id,
      from: intern2.account,
      to: host1.account,
      amount: 1000,
      type: "installment",
    },
    {
      user: intern2._id,
      from: intern2.account,
      to: host2.account,
      amount: 700,
      type: "installment",
    },
    // coupons transactions
    // from organsisation to host
    {
      user: orgAdmin1._id,
      // this is the account for the org not the user
      from: orgAdmin1.account,
      to: intern1.account,
      amount: 200,
      type: "couponTransaction",
    },
    {
      user: orgAdmin1._id,
      from: orgAdmin1.account,
      to: intern2.account,
      amount: 300,
      type: "couponTransaction",
    },
    {
      user: orgAdmin1._id,
      from: orgAdmin1.account,
      to: intern4.account,
      amount: 350,
      type: "couponTransaction",
    },
    {
      user: orgAdmin1._id,
      from: orgAdmin1.account,
      to: intern1.account,
      amount: 250,
      type: "couponTransaction",
    },
    // hosts donations
    {
      user: host1._id,
      from: host1.account,
      // to presspad account
      to: admin.account,
      amount: 900,
      type: "donation",
    },
    {
      user: host1._id,
      from: host1.account,
      // to presspad account
      to: admin.account,
      amount: 1200,
      type: "donation",
    },
    {
      user: host2._id,
      from: host2.account,
      // to presspad account
      to: admin.account,
      amount: 500,
      type: "donation",
    },
  ];
  await InternalTransaction.create(internalTransactions);
};
