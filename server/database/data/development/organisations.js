const shortid = require('shortid');
const Organisation = require('../../models/Organisation');
const Account = require('../../models/Account');

module.exports = async () => {
  const accounts = await Account.find();
  const [
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    orgAccount1,
    orgAccount2,
    orgAccount3,
    orgAccount4,
  ] = accounts;

  const organisations = [
    {
      name: 'Financial Times',
      code: shortid.generate(),
      plan: 'basic',
      credits: 500,
      logo: {
        fileName: 'test.svg',
      },
      account: orgAccount1._id,
    },
    {
      name: 'The Guardian',
      code: shortid.generate(),
      plan: 'basic',
      credits: 1500,
      logo: {
        fileName: 'test.svg',
      },
      account: orgAccount2._id,
    },
    {
      name: 'BBC',
      code: shortid.generate(),
      plan: 'basic',
      credits: 750,
      logo: {
        fileName: 'test.svg',
      },
      account: orgAccount3._id,
    },
    {
      name: 'AFP',
      code: shortid.generate(),
      plan: 'basic',
      credits: 200,
      logo: {
        fileName: 'test.svg',
      },
      account: orgAccount4._id,
    },
  ];

  await Organisation.create(organisations);
};
