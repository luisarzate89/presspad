const Account = require("./../../models/Account");

module.exports = async () => {
  const accounts = [
    // Presspad account
    {
      income: 25000,
      withdrawal: 0,
      donation: 0,
      currentBalance: 25000,
    },
    // iterns accounts
    {
      income: 2500,
      withdrawal: 0,
      donation: 0,
      currentBalance: 0,
    },
    {
      income: 1000,
      withdrawal: 0,
      donation: 0,
      currentBalance: 0,
    },
    // hosts accounts
    {
      income: 5000,
      withdrawal: 3000,
      donation: 1000,
      currentBalance: 1000,
    },
    {
      income: 2500,
      withdrawal: 1000,
      donation: 500,
      currentBalance: 1000,
    },
    // organisations accounts
    {
      income: 4000,
      withdrawal: 0,
      donation: 0,
      couponsValue: 2000,
      currentBalance: 2000,
    },
    {
      income: 3500,
      withdrawal: 0,
      donation: 0,
      couponsValue: 2000,
      currentBalance: 1500,
    },
  ];
  await Account.create(accounts);
};
