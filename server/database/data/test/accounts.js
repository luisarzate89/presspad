const Account = require("./../../models/Account");

module.exports = () => {
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
    {
      income: 3000,
      withdrawal: 0,
      donation: 0,
      currentBalance: 0,
    },
    {
      income: 1050,
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
    {
      income: 4000,
      withdrawal: 2000,
      donation: 1000,
      currentBalance: 1000,
    },
    {
      income: 2500,
      withdrawal: 1000,
      donation: 500,
      currentBalance: 1000,
    },
    {
      income: 2800,
      withdrawal: 1000,
      donation: 500,
      currentBalance: 1300,
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
    {
      income: 6500,
      withdrawal: 0,
      donation: 0,
      couponsValue: 2000,
      currentBalance: 4500,
    },
    {
      income: 4500,
      withdrawal: 0,
      donation: 0,
      couponsValue: 1000,
      currentBalance: 3500,
    },
  ];
  return Account.create(accounts);
};
