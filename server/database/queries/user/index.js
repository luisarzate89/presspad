const mongoose = require("mongoose");
const User = require("../../models/User");

module.exports.findByEmail = email => User.findOne({ email: email.toLowerCase() });

module.exports.getUserById = (id, withoutPassword) => (withoutPassword ? User.findById(id, { password: 0 }) : User.findById(id));
