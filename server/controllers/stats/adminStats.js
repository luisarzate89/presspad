const boom = require("boom");

// IMPORT QUERIES
const { getAllClientStats } = require("./../../database/queries/stats/getAllClientStats");
const { getAllInternStats } = require("./../../database/queries/stats/getAllInternStats");
const { getInternStatus } = require("./../../database/queries/user/index");

module.exports = async (req, res, next) => {
  // get user data so we can check they are authorized
  const { user } = req;

  if (user.role !== "admin") return next(boom.notAuthorized("You do not have sufficient priveleges"));

  // get whether you want client, intern or host data
  const { userType } = req.body;

  if (userType === "client") {
    getAllClientStats()
      .then((stats) => {
        if (stats.length === 0) return res.json(stats);

        const cleanStats = stats.map((client) => {
          const clientObj = {
            key: stats.indexOf(client) + 1,
            organisation: client.name,
            totalCredits: client.userDetails.credits,
            creditsSpent: client.spentCredits,
            interns: client.numberOfInterns,
            plan: client.userDetails.plan,
            currentlyHosted: client.currentlyHosted,
          };
          return clientObj;
        });
        return res.json(cleanStats);
      })
      .catch(err => next(boom.badImplementation(err)));
  } else if (userType === "intern") {
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
            totalCredits: intern.credits,
            creditsSpent: intern.spentCredits,
            status,
          };
          return internObj;
        });
        return res.json(cleanStats);
      })
      .catch(err => next(boom.badImplementation(err)));
  } else return res.json("getting hosts next");
};
