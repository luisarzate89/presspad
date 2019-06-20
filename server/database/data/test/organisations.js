const shortid = require("shortid");
const Organisation = require("../../models/Organisation");

module.exports = async () => {
  const organisations = [
    {
      name: "Financial Times",
      code: shortid.generate(),
    },
    {
      name: "The Guardian",
      code: shortid.generate(),
    },
    {
      name: "BBC",
      code: shortid.generate(),
    },
    {
      name: "AFP",
      code: shortid.generate(),
    },
  ];

  await Organisation.create(organisations);
};
