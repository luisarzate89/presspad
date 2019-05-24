const boom = require("boom");

const { getUserById } = require("./../../database/queries/user");

module.exports = (req, res, next) => {
  const { referralId } = req.body;

  console.log(referralId);

  getUserById(referralId, true)
    .then((storedUser) => {
      if (!storedUser) {
        return next(
          boom.notFound(
            "We cannot find a user with your referral code. Please try again with another code.",
          ),
        );
      }

      const referralUser = {
        id: storedUser._id,
        name: storedUser.name,
      };

      return res.json(referralUser);
    })
    .catch(err => next(boom.badImplementation(err)));
};
