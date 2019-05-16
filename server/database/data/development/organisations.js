const Organisation = require("../../models/Organisation");

module.exports = async () => {
  const organisations = [
    {
      name: "Financial Times",
      code: "FT4C5Y",
    },
    {
      name: "The Guardian",
      code: "TG3T1Y",
    },
    {
      name: "BBC",
      code: "BB0I7U",
    },
    {
      name: "AFP",
      code: "AF2R2P",
    },
  ];

  const storedOrganisations = await Organisation.create(organisations);

  return storedOrganisations;
};
