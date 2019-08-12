const Listing = require("../../models/Listing");
const User = require("../../models/User");
const Booking = require("../../models/Booking");

module.exports = async () => {
  const interns = await User.find({ role: "intern" });
  const listings = await Listing.find();

  const bookings = [
    {
      listing: listings[0],
      intern: interns[0],
      host: listings[0].user,
      startDate: "2019-06-19",
      endDate: "2019-06-30",
      price: 300,
    },
    {
      listing: listings[2],
      intern: interns[0],
      host: listings[2].user,
      startDate: "2019-07-24",
      endDate: "2019-08-12",
      price: 400,
    },
    {
      listing: listings[0],
      intern: interns[1],
      host: listings[0].user,
      startDate: "2019-05-20",
      endDate: "2019-06-12",
      status: "canceled",
      price: 200,
    },
    {
      listing: listings[1],
      intern: interns[1],
      host: listings[1].user,
      startDate: "2019-05-16",
      endDate: "2019-06-16",
      status: "confirmed",
      price: 100,
    },
    {
      listing: listings[1],
      intern: interns[2],
      host: listings[1].user,
      startDate: "2019-06-14",
      endDate: "2019-07-16",
      status: "confirmed",
      price: 200,
    },
    {
      listing: listings[2],
      intern: interns[3],
      host: listings[0].user,
      startDate: "2019-10-14",
      endDate: "2019-11-16",
      price: 300,
    },
  ];
  await Booking.create(bookings);
};
