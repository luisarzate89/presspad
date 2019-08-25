const Transaction = require("../../models/Transaction");
const User = require("../../models/User");

module.exports = async () => {
  const interns = await User.find({ role: "intern" }).sort({ name: 1 });
  const orgs = await User.find({ role: "organisation" }).sort({ name: 1 });
  const hosts = await User.find({ role: "host" }).sort({ name: 1 });

  const transactions = [
    {
      credits: 600,
      sender: orgs[0],
      recipient: interns[0],
    },
    {
      credits: 400,
      sender: orgs[1],
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
