const User = require('../../models/User');
const WithdrawRequest = require('../../models/WithdrawRequest');

module.exports = async () => {
  const users = await User.find();
  const [, , , , , host1, host2, , , ,] = users;

  const withdrawRequests = [
    {
      user: host1._id,
      account: host1.account,
      status: 'pending',
      amount: 500,
      bankName: 'bankName',
      bankSortCode: 'bankSortCode',
      accountNumber: 'accountNumber',
    },
    {
      user: host1._id,
      account: host1.account,
      type: 'transfered',
      amount: 200,
      bankName: 'bankName2',
      bankSortCode: 'bankSortCode2',
      accountNumber: 'accountNumber2',
    },
    {
      user: host2._id,
      account: host2.account,
      type: 'rejected',
      amount: 1000000,
      bankName: 'bankName3',
      bankSortCode: 'bankSortCode3',
      accountNumber: 'accountNumber3',
    },
    {
      user: host2._id,
      account: host2.account,
      type: 'rejected',
      amount: 100,
      bankName: 'bankName4',
      bankSortCode: 'bankSortCode4',
      accountNumber: 'accountNumber4',
      // before one month at least
      createdAt: '2019-07-16',
    },
  ];
  await WithdrawRequest.create(withdrawRequests);
};
