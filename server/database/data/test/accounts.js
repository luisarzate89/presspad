const Account = require('../../models/Account');

const emptyAccount = {
  income: 0,
  withdrawal: 0,
  donation: 0,
  currentBalance: 0,
  couponsValue: 0,
};

const presspadAccountData = {
  ...emptyAccount,
  currentBalance: 120 + 33.33,
  income: 120 + 33.33,
};

const internAccountData = { ...emptyAccount, income: 60 + 33.33 };

const hostAccountData = {
  ...emptyAccount,
  income: 120 + 33.33,
  currentBalance: 120 + 33.33,
};
const organisationAccountData = { ...emptyAccount, income: 60 };

const allAccounts = [
  presspadAccountData,
  internAccountData,
  hostAccountData,
  organisationAccountData,
];

const createNew = () => Account.create(emptyAccount);
const reset = () => Account.deleteMany();

const createAll = async () => {
  await reset();
  const [
    presspadAccount,
    internAccount,
    hostAccount,
    organisationAccount,
  ] = await Account.create(allAccounts);

  return { presspadAccount, internAccount, hostAccount, organisationAccount };
};

module.exports = {
  createAll,
  createNew,
  reset,
};
