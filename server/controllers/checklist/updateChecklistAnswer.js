const boom = require('boom');
const { updateChecklistAnswer } = require('./../../database/queries/checkList');

module.exports = async (req, res, next) => {
  try {
    const { isChecked } = req.body;
    const { id } = req.params; // id of the answer to be updated
    const { _id: userId } = req.user;

    const updateDate = {
      isChecked: !!isChecked,
    };

    const updatedAnswer = await updateChecklistAnswer({
      id,
      userId,
      updateDate,
    });
    if (!updatedAnswer) {
      return boom.notFound('answer not found');
    }

    return res.json(updatedAnswer);
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};
