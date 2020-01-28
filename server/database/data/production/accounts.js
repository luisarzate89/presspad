const Account = require("../../models/Account");

module.exports = async () => {
  const account = [
    // Presspad account
    {
      income: 0,
      withdrawal: 0,
      donation: 0,
      currentBalance: 0,
    },
  ];
  await Account.create(account);
};
