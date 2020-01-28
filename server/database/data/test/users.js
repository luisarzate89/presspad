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
  // const organisations = await Organisation.find();

  const BBC = await Organisation.findOne({ name: "BBC" });
  const FTimes = await Organisation.findOne({ name: "Financial Times" });
  const Guardian = await Organisation.findOne({ name: "The Guardian" });
  const AFP = await Organisation.findOne({ name: "AFP" });

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
      organisation: FTimes._id,
      plan: "basic",
      account: orgAccount1._id,
    },
    {
      email: "josephine@guardian.co.uk",
      name: "Josephine Doeski",
      password: "123456",
      role: "organisation",
      organisation: Guardian._id,
      plan: "basic",
      account: orgAccount2._id,
    },
    {
      email: "brian@bbc.co.uk",
      name: "Brian Meyer",
      password: "123456",
      role: "organisation",
      organisation: BBC._id,
      account: orgAccount3._id,
    },
    {
      email: "luise@afp.co.uk",
      name: "Luise Michaels",
      password: "123456",
      role: "organisation",
      organisation: AFP._id,
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
      organisation: BBC._id,
      account: internsAccount1._id,
    },
    {
      email: "newby@gmail.com",
      name: "Newby French",
      password: "123456",
      role: "intern",
      organisation: AFP._id,
      account: internsAccount2._id,
    },
    {
      email: "joe@hello.com",
      name: "Joe The Friel",
      password: "123456",
      role: "intern",
      organisation: Guardian._id,
      account: internsAccount3._id,
    },
    {
      email: "ramy@rambo.co.uk",
      name: "Ramy Rambo",
      password: "123456",
      role: "intern",
      organisation: FTimes._id,
      account: internsAccount4._id,
    },
  ];

  const storredInterns = await User.create(interns);

  return storredInterns;
};
