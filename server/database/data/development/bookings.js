const Listing = require("../../models/Listing");
const User = require("../../models/User");
const Booking = require("../../models/Booking");

module.exports = async () => {
  const interns = await User.find({ role: "intern" });
  const listings = await Listing.find();

  const bookings = [
    {
      listing: listings[0],
      user: interns[0],
      startDate: "2019-05-19",
      endDate: "2019-07-12",
      status: "confirmed",
    },
    {
      listing: listings[1],
      user: interns[0],
      startDate: "2018-06-19",
      endDate: "2018-08-12",
      status: "pending",
    },
    {
      listing: listings[2],
      user: interns[0],
      startDate: "2020-02-19",
      endDate: "2020-03-12",
      status: "confirmed",
    },
    {
      listing: listings[0],
      user: interns[1],
      startDate: "2019-05-20",
      endDate: "2019-06-12",
      status: "canceled",
    },
    {
      listing: listings[1],
      user: interns[1],
      startDate: "2019-05-16",
      endDate: "2019-06-16",
      status: "confirmed",
    },
    {
      listing: listings[1],
      user: interns[2],
      startDate: "2019-06-14",
      endDate: "2019-07-16",
      status: "confirmed",
    },
    {
      listing: listings[2],
      user: interns[3],
      startDate: "2019-10-14",
      endDate: "2019-11-16",
      status: "pending",
    },
  ];
  await Booking.create(bookings);
};
