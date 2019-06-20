const shortid = require("shortid");
const User = require("../../models/User");
const Organisation = require("../../models/Organisation");
const OrgCodes = require("../../models/OrgCodes");

module.exports = async () => {
  // organisation codes
  const organisations = await Organisation.find();
  // create admin
  const admin = {
    email: "mark@presspad.co.uk",
    name: "Mark Upton",
    password: "123456",
    role: "admin",
  };
  await User.create(admin);

  // create organisation users
  const organisationUsers = [
    {
      email: "michael@financialtimes.co.uk",
      name: "Michael Peters",
      password: "123456",
      role: "organisation",
      organisation: organisations[0],
    },
    {
      email: "josephine@guardian.co.uk",
      name: "Josephine Doeski",
      password: "123456",
      role: "organisation",
      organisation: organisations[1],
    },
    {
      email: "brian@bbc.co.uk",
      name: "Brian Meyer",
      password: "123456",
      role: "organisation",
      organisation: organisations[2],
    },
    {
      email: "luise@afp.co.uk",
      name: "Luise Michaels",
      password: "123456",
      role: "organisation",
      organisation: organisations[3],
    },
  ];

  await User.create(organisationUsers);

  // create superhost
  const superhost = {
    email: "alexandra@presspad.co.uk",
    name: "Alexandra Lions",
    password: "123456",
    role: "superhost",
    credits: 8200,
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
      credits: 3200,
    },
    {
      email: "eve@hello.com",
      name: "Eve Richards",
      password: "123456",
      role: "host",
      referral: storedSuperhost,
      credits: 6100,
    },
    {
      email: "hilda@bbc.co.uk",
      name: "Hilda Meyer",
      password: "123456",
      role: "host",
      referral: storedSuperhost,
      credits: 3500,
    },
    {
      email: "simon@gmail.com",
      name: "Simon Dupree",
      password: "123456",
      role: "host",
      referral: storedSuperhost,
      credits: 1700,
    },
  ];

  await User.create(hosts);

  // create interns
  const interns = [
    {
      email: "mone@gmail.com",
      name: "Mone Dupree",
      password: "123456",
      role: "intern",
      organisation: organisations[0],
      credits: 1200,
    },
    {
      email: "newby@gmail.com",
      name: "Newby French",
      password: "123456",
      role: "intern",
      organisation: organisations[0],
      credits: 2200,
    },
    {
      email: "joe@hello.com",
      name: "Joe The Friel",
      password: "123456",
      role: "intern",
      organisation: organisations[1],
      credits: 3100,
    },
    {
      email: "ramy@rambo.co.uk",
      name: "Ramy Rambo",
      password: "123456",
      role: "intern",
      organisation: organisations[2],
      credits: 1400,
    },
  ];

  const storredInterns = await User.create(interns);

  return storredInterns;
};
