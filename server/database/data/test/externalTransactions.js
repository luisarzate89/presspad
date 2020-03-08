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
      amount: 6000,
      createdAt: Date.now() - 25 * 24 * 60 * 60 * 1000,
    },
    {
      user: organisationUser._id,
      account: organisationAccount._id,
      type: 'deposite',
      amount: 10500,
      createdAt: Date.now() - 15 * 24 * 60 * 60 * 1000,
    },
    // intern paying the completed booking
    {
      user: internUser._id,
      account: internAccount._id,
      type: 'deposite',
      amount: 6000,
      createdAt: Date.now() - 20 * 24 * 60 * 60 * 1000,
    },
    // intern paying the conrfimed booking (first payment)
    {
      user: internUser._id,
      account: internAccount._id,
      type: 'deposite',
      amount: 3333,
      createdAt: Date.now() + 20 * 24 * 60 * 60 * 1000,
    },
  ];
  const [
    organisationTransaction,
    internPayingUpfrontTransaction,
    internPayingFirstTransaction,
  ] = await ExternalTransaction.create(externalTransactions);

  return {
    organisationTransaction,
    internPayingUpfrontTransaction,
    internPayingFirstTransaction,
  };
};

module.exports = {
  createAll,
  reset,
};
