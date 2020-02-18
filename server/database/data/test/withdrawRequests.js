const WithdrawRequest = require('../../models/WithdrawRequest');

const reset = () => WithdrawRequest.deleteMany();

const createAll = async ({ users, accounts }) => {
  const { hostUser } = users;
  const { hostAccount } = accounts;

  const withdrawRequests = {
    user: hostUser._id,
    account: hostAccount._id,
    status: 'pending',
    amount: 100,
    bankName: 'bankName',
    bankSortCode: 'bankSortCode',
    accountNumber: 'accountNumber',
  };

  const pendingWithdrawRequest = await WithdrawRequest.create(withdrawRequests);

  return { pendingWithdrawRequest };
};

module.exports = {
  createAll,
  reset,
};
