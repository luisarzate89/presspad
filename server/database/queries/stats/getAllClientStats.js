const Organisation = require("../../models/Organisation");

const { getInternStatus } = require("./../user/index");

module.exports.getAllClientStats = async () => {
  const clientStats = await Organisation.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "organisation",
        as: "users",
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        plan: 1,
        interns: {
          $filter: {
            input: "$users",
            as: "user",
            cond: { $eq: ["$$user.role", "intern"] },
          },
        },
      },
    },
    {
      $addFields: {
        numberOfInterns: { $size: "$interns" },
        internList: "$interns",
      },
    },
    {
      $lookup: {
        from: "transactions",
        localField: "_id",
        foreignField: "sendingOrganisation",
        as: "transactions",
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        plan: 1,
        credits: 1,
        "interns._id": 1,
        "interns.name": 1,
        numberOfInterns: 1,
        spentCredits: { $sum: "$transactions.credits" },
      },
    },
  ]);

  // additional function to get number of interns currently being hosted
  const completeClientStats = await Promise.all(
    // map through each of the clients
    clientStats.map(async (client) => {
      // set up a new object for this client
      const newClientObj = client;

      // create a new key for currentlyHosted and default to 0
      newClientObj.currentlyHosted = 0;

      if (newClientObj.interns && newClientObj.interns.length > 0) {
        // map through all the interns and get their list of bookings and status
        const internBookings = await Promise.all(
          newClientObj.interns.map(async intern => getInternStatus(intern._id)),
        );
        // clean up the result so all bookings are in one array
        const cleanBookings = internBookings.reduce((a, b) => a.concat(b), []);
        // filter so only have bookings where they are at the host
        newClientObj.currentlyHosted = cleanBookings.filter(
          booking => booking.status === "At host",
        ).length;
      }
      return newClientObj;
    }),
  );

  return completeClientStats;
};
