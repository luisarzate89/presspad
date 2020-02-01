const shortid = require('shortid');
const Organisation = require('../../models/Organisation');
const OrgCodes = require('../../models/OrgCodes');

module.exports.addOrg = (name, logo, account) =>
  Organisation.create({
    name,
    logo,
    account,
  });

module.exports.getOrgByName = name => Organisation.find({ name });

module.exports.checkCode = uniqueCode => OrgCodes.findOne({ code: uniqueCode });

module.exports.createCode = organisationId =>
  OrgCodes.create({
    organisation: organisationId,
    code: shortid.generate(),
  });

module.exports.deleteCode = usedCode => OrgCodes.deleteOne({ code: usedCode });

// this query is so we can validate on the front end if trying to add new organisation
module.exports.getAllOrgs = () =>
  Organisation.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: 'organisation',
        as: 'orgDetails',
      },
    },
    {
      $unwind: '$orgDetails',
    },
    {
      $project: {
        name: 1,
        'orgDetails.email': 1,
      },
    },
  ]);
