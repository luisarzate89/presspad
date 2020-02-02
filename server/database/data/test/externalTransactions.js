const ExternalTransaction = require('../../models/ExternalTransaction');
const User = require('../../models/User');

module.exports = async () => {
  const [host1, host2] = await User.find({ role: 'host' }).sort({ name: 1 });
  const [orgAdmin1, orgAdmin2, orgAdmin3] = await User.find({
    role: 'organisation',
  }).sort({ name: 1 });

  const externalTransactions = [
    // organisations
    {
      user: orgAdmin1._id,
      account: orgAdmin1.account,
      type: 'deposite',
      amount: 900,
    },
    {
      user: orgAdmin1._id,
      account: orgAdmin1.account,
      type: 'deposite',
      amount: 2000,
    },
    {
      user: orgAdmin2._id,
      account: orgAdmin2.account,
      type: 'deposite',
      amount: 1500,
    },
    {
      user: orgAdmin3._id,
      account: orgAdmin3.account,
      type: 'deposite',
      amount: 2500,
    },
    {
      user: orgAdmin3._id,
      account: orgAdmin3.account,
      type: 'deposite',
      amount: 2500,
    },
    {
      user: host1._id,
      account: host1.account,
      type: 'withdraw',
      amount: 2500,
    },
    {
      user: host1._id,
      account: host1.account,
      type: 'withdraw',
      amount: 950,
    },
    {
      user: host2._id,
      account: host2.account,
      type: 'withdraw',
      amount: 550,
    },
  ];
  await ExternalTransaction.create(externalTransactions);
};
