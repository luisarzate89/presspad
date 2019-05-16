const Referal = require("../../models/Referal");
const User = require("../../models/User");

module.exports = async () => {
  const superhost = await User.find({ role: "superhost" });

  const hosts = await User.find({ role: "host" });

  const referrals = [
    {
      referrer: superhost[0]._id,
      referred: hosts[0]._id,
    },
    {
      referrer: superhost[0]._id,
      referred: hosts[1]._id,
    },
    {
      referrer: superhost[0]._id,
      referred: hosts[2]._id,
    },
  ];
  const storedReferrals = await Referal.create(referrals);

  return storedReferrals;
};
