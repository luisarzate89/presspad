const Organisation = require('../../models/Organisation');
const account = require('./accounts');

const reset = () => Organisation.deleteMany();

const createNew = async ({ name }) => {
  const newAccount = await account.createNew();

  const newOrganisation = {
    name,
    logo: {
      fileName: 'test.svg',
    },
    account: newAccount._id,
  };

  return Organisation.create(newOrganisation);
};

const createAll = async ({ accounts }) => {
  await reset();
  const { organisationAccount } = accounts;

  const organisations = [
    {
      name: 'Financial Times',
      logo: {
        fileName: 'test.svg',
      },
      account: organisationAccount._id,
    },
  ];

  const [financialTimeOrganisation] = await Organisation.create(organisations);
  return { financialTimeOrganisation };
};

module.exports = {
  createAll,
  createNew,
  reset,
};
