const Listing = require('../../models/Listing');
const User = require('../../models/User');
const Booking = require('../../models/Booking');

module.exports = async () => {
  const interns = await User.find({ role: 'intern' }).sort({
    name: 1,
    email: 1,
  });
  const listings = await Listing.find().sort({ 'address.postcode': 1 });

  const bookings = [
    {
      listing: listings[0],
      intern: interns[0],
      host: listings[0].user,
      startDate: Date.now() - 30 * 24 * 60 * 60 * 1000,
      endDate: Date.now() - 15 * 24 * 60 * 60 * 1000,
      price: 300,
    },
    {
      listing: listings[0],
      intern: interns[1],
      host: listings[0].user,
      startDate: Date.now() + 15 * 24 * 60 * 60 * 1000,
      endDate: Date.now() - 30 * 24 * 60 * 60 * 1000,
      price: 436,
    },
    {
      listing: listings[1],
      intern: interns[0],
      host: listings[1].user,
      startDate: Date.now() - 7 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 7 * 24 * 60 * 60 * 1000,
      price: 400,
    },
    {
      listing: listings[0],
      intern: interns[1],
      host: listings[0].user,
      startDate: Date.now() - 30 * 24 * 60 * 60 * 1000,
      endDate: Date.now() - 15 * 24 * 60 * 60 * 1000,
      confirmDate: Date.now() - 36 * 24 * 60 * 60 * 1000,
      status: 'confirmed',
      price: 300,
    },
    {
      listing: listings[1],
      intern: interns[1],
      host: listings[1].user,
      startDate: Date.now() - 30 * 24 * 60 * 60 * 1000,
      endDate: Date.now() - 15 * 24 * 60 * 60 * 1000,
      confirmDate: Date.now() - 36 * 24 * 60 * 60 * 1000,
      status: 'confirmed',
      price: 100,
    },
    {
      listing: listings[1],
      intern: interns[2],
      host: listings[1].user,
      startDate: Date.now() - 30 * 24 * 60 * 60 * 1000,
      endDate: Date.now() - 15 * 24 * 60 * 60 * 1000,
      confirmDate: Date.now() - 36 * 24 * 60 * 60 * 1000,
      status: 'confirmed',
      price: 200,
    },
    {
      listing: listings[2],
      intern: interns[1],
      host: listings[2].user,
      startDate: Date.now() + 10 * 24 * 60 * 60 * 1000,
      endDate: Date.now() + 15 * 24 * 60 * 60 * 1000,
      price: 300,
    },
  ];
  await Booking.create(bookings);
};
