const ExternalTransaction = require('../../models/ExternalTransaction');

const reset = () => ExternalTransaction.deleteMany();

const createAll = async ({ users, accounts }) => {
  await reset();

  const { organisationUser, internUser } = users;
  const { organisationAccount, internAccount } = accounts;

  const externalTransactions = [
    // organisations for paying the coupon expenses
    {
      user: organisationUser._id,
      account: organisationAccount._id,
      type: 'deposite',
      amount: 60,
      createdAt: Date.now() - 25 * 24 * 60 * 60 * 1000,
    },
    // intern paying the completed booking
    {
      user: internUser._id,
      account: internAccount._id,
      type: 'deposite',
      amount: 60,
      createdAt: Date.now() - 20 * 24 * 60 * 60 * 1000,
    },
    // intern paying the conrfimed booking (first payment)
    {
      user: internUser._id,
      account: internAccount._id,
      type: 'deposite',
      amount: 33.33,
      createdAt: Date.now() + 20 * 24 * 60 * 60 * 1000,
    },
  ];
  await ExternalTransaction.create(externalTransactions);
};

module.exports = {
  createAll,
  reset,
};
