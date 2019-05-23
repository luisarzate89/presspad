const mongoose = require("mongoose");
const shortid = require("shortid");
const Organisation = require("../../models/Organisation");

module.exports.addOrg = (name, logo) => Organisation.create({ name, logo, code: shortid.generate() });

module.exports.findOrg = uniqueCode => Organisation.findOne({ code: uniqueCode });
