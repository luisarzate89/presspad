const mongoose = require("mongoose");

const User = require("../../models/User");
const Booking = require("../../models/Booking");

const { addOrg } = require("./organisation");

module.exports.findByEmail = email => User.findOne({ email: email.toLowerCase() });

module.exports.getUserById = (id, withoutPassword) => (withoutPassword
  ? User.findById(id, { password: 0 })
  : User.findById(id));

module.exports.addNewUser = async (userInfo) => {
  const {
    email, name, password, role,
  } = userInfo;

  if (role === "organisation") {
    const { organisation, logo } = userInfo;
    const newOrg = await addOrg(organisation, logo);
    return User.create({
      email: email.toLowerCase(),
      name,
      password,
      role,
      organisation: newOrg,
    });
  }
  if (role === "host") {
    const { referral } = userInfo;
    return User.create({
      email: email.toLowerCase(),
      name,
      password,
      role,
      referral,
    });
  }
  // assume it's intern at this point
  const { organisation } = userInfo;
  return User.create({
    email: email.toLowerCase(),
    name,
    password,
    role,
    organisation,
  });
};

module.exports.getInternStatus = id => Booking.aggregate([
  // get all the bookings for that intern
  {
    $match: { user: mongoose.Types.ObjectId(id) },
  },
  //  get only bookings that haven't ended yet
  {
    $match: { endDate: { $gt: new Date() } },
  },
  // return all the bookings that are either at host, confirmed or pending
  {
    $project: {
      status: {
        $switch: {
          branches: [
            {
              case: {
                $and: [
                  { $lte: ["$startDate", new Date()] },
                  { $gte: ["$endDate", new Date()] },
                  { $eq: ["$status", "confirmed"] },
                ],
              },
              then: "At host",
            },
            {
              case: {
                $and: [{ $gt: ["$startDate", new Date()] }, { $eq: ["$status", "pending"] }],
              },
              then: "Pending request",
            },
            {
              case: {
                $and: [{ $gt: ["$startDate", new Date()] }, { $eq: ["$status", "confirmed"] }],
              },
              then: "Booking confirmed",
            },
          ],
          default: "Looking for host",
        },
      },
    },
  },
]);
