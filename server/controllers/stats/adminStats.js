const boom = require("boom");

// IMPORT QUERIES
const { getAllClientStats } = require("./../../database/queries/stats/getAllClientStats");
const { getAllInternStats } = require("./../../database/queries/stats/getAllInternStats");
const { getAllHostStats } = require("./../../database/queries/stats/getAllHostStats");

module.exports = async (req, res, next) => {
  // get user data so we can check they are authorized
  const { user } = req;

  if (user.role !== "admin") return next(boom.unauthorized("You do not have sufficient priveleges"));

  // get whether you want client, intern or host data
  const { userType } = req.body;

  if (userType === "clients") {
    getAllClientStats()
      .then((stats) => {
        if (stats.length === 0) return res.json(stats);

        const cleanStats = stats.map((client) => {
          const clientObj = {
            key: stats.indexOf(client) + 1,
            organisation: client.name,
            totalCredits: client.credits,
            creditsSpent: client.spentCredits,
            interns: client.numberOfInterns,
            plan: client.plan,
            currentlyHosted: client.currentlyHosted,
            userId: client._id,
          };
          return clientObj;
        });
        return res.json(cleanStats);
      })
      .catch(err => next(boom.badImplementation(err)));
  } else if (userType === "interns") {
    getAllInternStats()
      .then((stats) => {
        if (stats.length === 0) return res.json(stats);

        const cleanStats = stats.map((intern) => {
          let status = "Looking for host";

          if (intern.liveBookings > 0) {
            status = "At host";
          } else if (intern.pendingBookings > 0) {
            status = "Pending request";
          } else if (intern.confirmedBookings > 0) {
            status = "Booking confirmed";
          }

          const internObj = {
            key: stats.indexOf(intern) + 1,
            name: intern.name,
            organisation: intern.organisation[0].name,
            totalCredits: intern.credits || 0,
            creditsSpent: intern.spentCredits || 0,
            status,
            userId: intern._id,
          };
          return internObj;
        });

        return res.json(cleanStats);
      })
      .catch(err => next(boom.badImplementation(err)));
  } else if (userType === "hosts") {
    getAllHostStats()
      .then((stats) => {
        if (stats.length === 0) return res.json(stats);

        const cleanStats = stats.map((host) => {
          const hostObj = {
            key: stats.indexOf(host) + 1,
            name: host.name,
            city: host.listing.address.city,
            hosted: host.internsHosted,
            approvalStatus: host.profile[0].verified ? "Approved" : "Waiting for approval",
            profileId: host.profile[0]._id,
            userId: host._id,
          };
          return hostObj;
        });
        return res.json(cleanStats);
      })
      .catch(err => next(boom.badImplementation(err)));
  } else return next(boom.badRequest());
};
