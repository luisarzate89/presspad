const User = require('../../models/User');
const organisation = require('./organisations');
const account = require('./accounts');

const reset = () => User.deleteMany();

const createNew = async ({ email, name, password, role }) => {
  const newUserData = {
    email: email || `${role}-test@test.com`,
    name: name || 'name',
    password: password || '123456',
    role,
  };

  const newAccount = await account.createNew();

  newUserData.account = newAccount._id;

  if (role === 'organisation') {
    const newOrganisation = await organisation.createNew();
    newUserData.organisation = newOrganisation._id;
    newUserData.account = newOrganisation.account;
  }

  return User.create(newUserData);
};

const createAll = async ({ accounts, organisations }) => {
  const { financialTimeOrganisation } = organisations;

  await reset();

  const {
    presspadAccount,
    internAccount,
    hostAccount,
    organisationAccount,
  } = accounts;

  const admin = {
    email: 'admin@test.com',
    name: 'Mark Upton',
    password: '123456',
    role: 'admin',
    account: presspadAccount._id,
  };

  const organisationUser = {
    email: 'organisation@test.com',
    name: 'Michael Peters',
    password: '123456',
    role: 'organisation',
    organisation: financialTimeOrganisation._id,
    account: organisationAccount._id,
  };

  const host = {
    email: 'host@test.com',
    name: 'Adam Appele',
    password: '123456',
    role: 'host',
    account: hostAccount._id,
  };

  const intern = {
    email: 'intern@test.com',
    name: 'Mone Dupree',
    password: '123456',
    role: 'intern',
    organisation: financialTimeOrganisation._id,
    account: internAccount._id,
  };

  const [
    adminUser,
    createdOrganisationUser,
    hostUser,
    internUser,
  ] = await User.create([admin, organisationUser, host, intern]);

  return {
    adminUser,
    organisationUser: createdOrganisationUser,
    hostUser,
    internUser,
  };
};

module.exports = {
  createAll,
  createNew,
  reset,
};
