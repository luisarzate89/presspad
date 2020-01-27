const boom = require("boom");

const { markAsSeen } = require("../../database/queries/notification");

module.exports = async (req, res, next) => {
  const { role } = req.user;
  let updateData;
  if (role === "organisation") {
    updateData = { seenForOrg: true };
  } else {
    updateData = { seen: true };
  }
  try {
    await markAsSeen(req.body, updateData);
    res.send();
  } catch (error) {
    next(boom.badImplementation(error));
  }
};
