const mongoose = require("mongoose");
const shortid = require("shortid");
const Organisation = require("../../models/Organisation");
const OrgCodes = require("../../models/OrgCodes");

module.exports.addOrg = (name, logo) => Organisation.create({ name, logo, code: shortid.generate() });

module.exports.checkCode = uniqueCode => OrgCodes.findOne({ code: uniqueCode });

module.exports.createCode = organisationId => OrgCodes.create({ organisation: organisationId, code: shortid.generate() });

module.exports.deleteCode = usedCode => OrgCodes.deleteOne({ code: usedCode });

// this query is so we can validate on the front end if trying to add new organisation
module.exports.getAllOrgs = () => Organisation.find();
