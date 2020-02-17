const Organisation = require('../../models/Organisation');

module.exports.addOrg = (name, logo, account) =>
  Organisation.create({
    name,
    logo,
    account,
  });

module.exports.getOrgByName = name => Organisation.find({ name });

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
