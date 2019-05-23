const shortid = require("shortid");
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
    userCode: shortid.generate(),
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
      plan: "basic",
      userCode: shortid.generate(),
    },
    {
      email: "josephine@guardian.co.uk",
      name: "Josephine Doeski",
      password: "123456",
      role: "organisation",
      organisation: organisationCodes[1],
      plan: "basic",
      userCode: shortid.generate(),
    },
    {
      email: "brian@bbc.co.uk",
      name: "Brian Meyer",
      password: "123456",
      role: "organisation",
      organisation: organisationCodes[2],
      plan: "basic",
      userCode: shortid.generate(),
    },
    {
      email: "luise@afp.co.uk",
      name: "Luise Michaels",
      password: "123456",
      role: "organisation",
      organisation: organisationCodes[3],
      plan: "basic",
      userCode: shortid.generate(),
    },
  ];

  await User.create(organisations);

  // create superhost
  const superhost = {
    email: "alexandra@presspad.co.uk",
    name: "Alexandra Lions",
    password: "123456",
    role: "superhost",
    userCode: shortid.generate(),
  };

  const storedSuperhost = await User.create(superhost);

  // create hosts
  const hosts = [
    {
      email: "adam@gmail.com",
      name: "Adam Appele",
      password: "123456",
      role: "host",
      referral: storedSuperhost,
      userCode: shortid.generate(),
    },
    {
      email: "eve@hello.com",
      name: "Eve Richards",
      password: "123456",
      role: "host",
      referral: storedSuperhost,
      userCode: shortid.generate(),
    },
    {
      email: "hilda@bbc.co.uk",
      name: "Hilda Meyer",
      password: "123456",
      role: "host",
      referral: storedSuperhost,
      userCode: shortid.generate(),
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
      userCode: shortid.generate(),
    },
    {
      email: "joe@hello.com",
      name: "Joe The Friel",
      password: "123456",
      role: "intern",
      organisation: organisationCodes[2],
      userCode: shortid.generate(),
    },
    {
      email: "ramy@rambo.co.uk",
      name: "Ramy Rambo",
      password: "123456",
      role: "intern",
      organisation: organisationCodes[0],
      userCode: shortid.generate(),
    },
  ];

  const storredInterns = await User.create(interns);

  return storredInterns;
};
