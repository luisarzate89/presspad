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
  currentBalance: 12000 + 3333 + 10500,
  income: 12000 + 3333 + 10500,
};

const internAccountData = { ...emptyAccount, income: 6000 + 3333 };

const hostAccountData = {
  ...emptyAccount,
  income: 12000 + 3333,
  currentBalance: 12000 + 3333,
};

const organisationAccountData = {
  ...emptyAccount,
  income: 6000 + 10500,
  currentBalance: 10500,
};

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
