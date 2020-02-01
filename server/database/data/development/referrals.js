const Referal = require('../../models/Referal');
const User = require('../../models/User');

module.exports = async () => {
  const superhost = await User.find({ role: 'superhost' });

  const hosts = await User.find({ role: 'host' });

  const referrals = [
    {
      referrer: superhost[0],
      referred: hosts[0],
    },
    {
      referrer: superhost[0],
      referred: hosts[1],
    },
    {
      referrer: superhost[0],
      referred: hosts[2],
    },
  ];
  await Referal.create(referrals);
};
