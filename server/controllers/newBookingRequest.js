const boom = require("boom");
const { createNewBooking } = require("../database/queries/bookings");

module.exports = async (req, res, next) => {
  const { user } = req;
  try {
    console.log(req.body);
    // const profileData = {
    //   user: user._id,
    //   listing: req.body.listing,
    //   interests: req.body.interests,
    //   organisation: {
    //     name: req.body.organisationName,
    //     website: req.body.organisationWebsite,
    //   },
    //   jobTitle: req.body.jobTitle,
    //   pressPass: req.body.pressPass,
    //   profileImage: req.body.profileImage,
    // };

    res.json({ success: true });
  } catch (error) {
    next(boom.badImplementation());
  }
};
