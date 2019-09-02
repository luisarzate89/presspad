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
    return getAllClientStats()
      .then((stats) => {
        if (stats.length === 0) return res.json(stats);

        return res.json(stats);
      })
      .catch((err) => {
        next(boom.badImplementation(err));
      });
  } if (userType === "interns") {
    return getAllInternStats()
      .then((stats) => {
        if (stats.length === 0) return res.json(stats);

        const cleanStats = stats.map((intern, index) => {
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
            organisation: intern.organisationName,
            totalPayments: intern.totalPayments || 0,
            status,
            userId: intern._id,
            nextInstallmentDueDate: index > 1 && new Date().setDate(5 + index * 3),
            nextInstallmentPaid: index > 1,
          };
          return internObj;
        });

        return res.json(cleanStats);
      })
      .catch((err) => {
        next(boom.badImplementation(err));
      });
  } if (userType === "hosts") {
    return getAllHostStats()
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
            totalIncome: host.totalIncome,
            currentBalance: host.currentBalance,
          };
          return hostObj;
        });
        return res.json(cleanStats);
      })
      .catch(err => next(boom.badImplementation(err)));
  } return next(boom.badRequest());
};
