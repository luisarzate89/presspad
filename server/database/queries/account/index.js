
const Account = require("../../models/Account");

module.exports.createNewAccount = () => Account.create({});

module.exports.returnCouponsValueToOrg = ({ id, returnedAmount, session }) => Account.updateOne(
  { _id: id },
  {
    $inc: {
      currentBalance: returnedAmount,
      couponsValue: -returnedAmount,
    },
  },
  {
    session,
  },
);
