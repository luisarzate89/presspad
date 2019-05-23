const mongoose = require("mongoose");
const shortid = require("shortid");
const User = require("../../models/User");

const { addOrg, findOrg } = require("./organisation");

module.exports.findByEmail = email => User.findOne({ email: email.toLowerCase() });

module.exports.getUserById = (id, withoutPassword) => (withoutPassword ? User.findById(id, { password: 0 }) : User.findById(id));

module.exports.addNewUser = async (userInfo) => {
  const {
    email, name, password, role,
  } = userInfo;

  if (role === "organisation") {
    const { organisation, logo } = userInfo;
    const newOrg = await addOrg(organisation, logo);
    return User.create({
      email: email.toLowerCase(),
      name,
      password,
      role,
      organisation: newOrg,
    });
  }
  if (role === "host") {
    const { referral } = userInfo;
    return User.create({
      email: email.toLowerCase(),
      name,
      password,
      role,
      referral,
    });
  }
  // assume it's intern at this point
  const { organisation } = userInfo;
  return User.create({
    email: email.toLowerCase(),
    name,
    password,
    role,
    organisation,
  });
};
