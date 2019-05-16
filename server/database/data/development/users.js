const User = require("../../models/User");
const Organisation = require("../../models/Organisation");

module.exports = async () => {
  // organisation codes
  const organisationCodes = await Organisation.find();

  const admin = {
    email: "mark@presspad.co.uk",
    name: "Mark Upton",
    password: "123456",
    role: "admin",
  };
  await User.create(admin);

  const organisations = [
    {
      email: "michael@financialtimes.co.uk",
      name: "Michael Peters",
      password: "123456",
      role: "organisation",
      organisation: organisationCodes[0],
    },
    {
      email: "josephine@guardian.co.uk",
      name: "Josephine Doeski",
      password: "123456",
      role: "organisation",
      organisation: organisationCodes[1],
    },
    {
      email: "brian@bbc.co.uk",
      name: "Brian Meyer",
      password: "123456",
      role: "organisation",
      organisation: organisationCodes[2],
    },
    {
      email: "luise@bbc.co.uk",
      name: "Luise Michaels",
      password: "123456",
      role: "organisation",
      organisation: organisationCodes[3],
    },
  ];
  const storedOrganisationUsers = await User.create(organisations);
  return storedOrganisationUsers;
};
