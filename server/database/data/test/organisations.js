const shortid = require("shortid");
const Organisation = require("../../models/Organisation");

module.exports = async () => {
  const organisations = [
    {
      name: "Financial Times",
      code: shortid.generate(),
      plan: "basic",
      credits: 500,
    },
    {
      name: "The Guardian",
      code: shortid.generate(),
      plan: "basic",
      credits: 1500,
    },
    {
      name: "BBC",
      code: shortid.generate(),
      plan: "basic",
      credits: 750,
    },
    {
      name: "AFP",
      code: shortid.generate(),
      plan: "basic",
      credits: 200,
    },
  ];

  await Organisation.create(organisations);
};
