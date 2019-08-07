const User = require("../../models/User");
const Organisation = require("../../models/Organisation");
const Account = require("../../models/Account");

module.exports = async () => {
  const accounts = await Account.find();
  const [
    adminAccount,
    internsAccount1,
    internsAccount2,
    internsAccount3,
    internsAccount4,
    hostAccount1,
    hostAccount2,
    hostAccount3,
    hostAccount4,
    hostAccount5,
    orgAccount1,
    orgAccount2,
    orgAccount3,
    orgAccount4,
  ] = accounts;
  // organisation codes
  const organisations = await Organisation.find();
  // create admin
  const admin = {
    email: "mark@presspad.co.uk",
    name: "Mark Upton",
    password: "123456",
    role: "admin",
    account: adminAccount._id,
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
      plan: "basic",
      account: orgAccount1._id,
    },
    {
      email: "josephine@guardian.co.uk",
      name: "Josephine Doeski",
      password: "123456",
      role: "organisation",
      organisation: organisations[1],
      plan: "basic",
      account: orgAccount2._id,
    },
    {
      email: "brian@bbc.co.uk",
      name: "Brian Meyer",
      password: "123456",
      role: "organisation",
      organisation: organisations[2],
      plan: "basic",
      account: orgAccount3._id,
    },
    {
      email: "luise@afp.co.uk",
      name: "Luise Michaels",
      password: "123456",
      role: "organisation",
      organisation: organisations[3],
      plan: "basic",
      account: orgAccount4._id,
    },
  ];

  await User.create(organisationUsers);

  // create superhost
  const superhost = {
    email: "alexandra@presspad.co.uk",
    name: "Alexandra Lions",
    password: "123456",
    role: "superhost",
    account: hostAccount1._id,
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
      account: hostAccount2._id,
    },
    {
      email: "eve@hello.com",
      name: "Eve Richards",
      password: "123456",
      role: "host",
      referral: storedSuperhost,
      account: hostAccount3._id,

    },
    {
      email: "hilda@bbc.co.uk",
      name: "Hilda Meyer",
      password: "123456",
      role: "host",
      referral: storedSuperhost,
      account: hostAccount4._id,
    },
    {
      email: "simon@gmail.com",
      name: "Simon Dupree",
      password: "123456",
      role: "host",
      referral: storedSuperhost,
      account: hostAccount5._id,
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
      account: internsAccount1._id,
    },
    {
      email: "newby@gmail.com",
      name: "Newby French",
      password: "123456",
      role: "intern",
      organisation: organisations[0],
      account: internsAccount2._id,
    },
    {
      email: "joe@hello.com",
      name: "Joe The Friel",
      password: "123456",
      role: "intern",
      organisation: organisations[1],
      account: internsAccount3._id,
    },
    {
      email: "ramy@rambo.co.uk",
      name: "Ramy Rambo",
      password: "123456",
      role: "intern",
      organisation: organisations[2],
      account: internsAccount4._id,
    },
  ];

  const storredInterns = await User.create(interns);

  return storredInterns;
};
