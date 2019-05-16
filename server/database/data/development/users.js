const User = require("../../models/User");
const Organisation = require("../../models/Organisation");

module.exports = async () => {
  // organisation codes
  const organisationCodes = await Organisation.find();
  // create admin
  const admin = {
    email: "mark@presspad.co.uk",
    name: "Mark Upton",
    password: "123456",
    role: "admin",
  };
  await User.create(admin);

  // create organisation users
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
      email: "luise@afp.co.uk",
      name: "Luise Michaels",
      password: "123456",
      role: "organisation",
      organisation: organisationCodes[3],
    },
  ];

  await User.create(organisations);

  // create superhost
  const superhost = {
    email: "alexandra@presspad.co.uk",
    name: "Alexandra Lions",
    password: "123456",
    role: "superhost",
  };

  const storedSuperhost = await User.create(superhost);

  // create hosts
  const hosts = [
    {
      email: "adam@gmail.com",
      name: "Adam Appele",
      password: "123456",
      role: "host",
      refCodeUsed: storedSuperhost,
    },
    {
      email: "eve@hello.com",
      name: "Eve Richards",
      password: "123456",
      role: "host",
      refCodeUsed: storedSuperhost,
    },
    {
      email: "hilda@bbc.co.uk",
      name: "Hilda Meyer",
      password: "123456",
      role: "host",
      refCodeUsed: storedSuperhost,
    },
  ];

  await User.create(hosts);

  // create interns
  const interns = [
    {
      email: "simon@gmail.com",
      name: "Simon Dupree",
      password: "123456",
      role: "intern",
      organisation: organisationCodes[3],
    },
    {
      email: "joe@hello.com",
      name: "Joe The Friel",
      password: "123456",
      role: "intern",
      organisation: organisationCodes[2],
    },
    {
      email: "ramy@rambo.co.uk",
      name: "Ramy Rambo",
      password: "123456",
      role: "intern",
      organisation: organisationCodes[0],
    },
  ];

  const storredInterns = await User.create(interns);

  return storredInterns;
};
