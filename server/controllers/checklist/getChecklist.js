const boom = require('boom');
const { getChecklistForUser } = require('../../database/queries/checkList');

module.exports = async (req, res, next) => {
  try {
    const { bookingId, userId } = req.params;
    const checkList = await getChecklistForUser(userId, bookingId);
    if (!checkList[0]) {
      return next(boom.notFound());
    }

    return res.json(checkList);
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
