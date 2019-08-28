const shortid = require("shortid");
const OrgCodes = require("../../models/OrgCodes");
const Organisation = require("../../models/Organisation");

module.exports = async () => {
  // organisations
  const organisations = await Organisation.find().sort({ name: 1 });

  // create orgCodes
  const orgCodes = [
    {
      code: shortid.generate(),
      organisation: organisations[0],
    },
    {
      code: shortid.generate(),
      organisation: organisations[0],
    },
    {
      code: shortid.generate(),
      organisation: organisations[1],
    },
    {
      code: shortid.generate(),
      organisation: organisations[1],
    },
    {
      code: shortid.generate(),
      organisation: organisations[2],
    },
    {
      code: shortid.generate(),
      organisation: organisations[2],
    },
    {
      code: shortid.generate(),
      organisation: organisations[3],
    },
    {
      code: shortid.generate(),
      organisation: organisations[3],
    },
  ];

  await OrgCodes.create(orgCodes);
};
