const WithdrawRequest = require('../../models/WithdrawRequest');

const reset = () => WithdrawRequest.deleteMany();

const createAll = async ({ users, accounts }) => {
  const { hostUser } = users;
  const { hostAccount } = accounts;

  const withdrawRequests = [
    {
      user: hostUser._id,
      account: hostAccount._id,
      status: 'pending',
      amount: 10000,
      bankName: 'bankName',
      bankSortCode: 'bankSortCode',
      accountNumber: 'accountNumber',
    },
    {
      user: hostUser._id,
      account: hostAccount._id,
      status: 'transfered',
      amount: 10000,
      bankName: 'bankName',
      bankSortCode: 'bankSortCode',
      accountNumber: 'accountNumber',
    },
  ];

  const [
    pendingWithdrawRequest,
    transferedWithdrawRequest,
  ] = await WithdrawRequest.create(withdrawRequests);

  return { pendingWithdrawRequest, transferedWithdrawRequest };
};

module.exports = {
  createAll,
  reset,
};
