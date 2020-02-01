const Transaction = require('../../models/Transaction');
const User = require('../../models/User');

module.exports = async () => {
  const interns = await User.find({ role: 'intern' });
  const orgs = await User.find({ role: 'organisation' });
  const hosts = await User.find({ role: 'host' });

  const transactions = [
    {
      credits: 600,
      sender: orgs[0],
      sendingOrganisation: orgs[0].organisation,
      recipient: interns[0],
    },
    {
      credits: 400,
      sender: orgs[1],
      sendingOrganisation: orgs[1].organisation,
      recipient: interns[1],
    },
    {
      credits: 100,
      sender: interns[0],
      recipient: hosts[0],
    },
    {
      credits: 300,
      sender: interns[0],
      recipient: hosts[1],
    },
    {
      credits: 250,
      sender: interns[1],
      recipient: hosts[1],
    },
  ];
  await Transaction.create(transactions);
};
