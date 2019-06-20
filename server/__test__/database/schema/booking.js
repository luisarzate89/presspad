const mongoose = require("mongoose");

const User = require("../../../database/models/User");
const Booking = require("../../../database/models/Booking");
const Listing = require("../../../database/models/Listing");
const buildDB = require("../../../database/data/test");

describe("Test Booking schema", () => {
  beforeAll(async (done) => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test("Booking schema should be defined", async () => {
    expect(Booking).toBeDefined();
  });

  test("should store Booking schema correctly", async (done) => {
    const bookings = await Booking.find();
    expect(bookings).toHaveLength(6);
    done();
  });

  test("should store a new Booking correctly", async (done) => {
    const interns = await User.find({ role: "intern" });
    const listings = await Listing.find();

    const newBooking = {
      listing: listings[0],
      user: interns[0],
      startDate: "2019-05-19",
      endDate: "2019-07-12",
      payment: 235,
    };

    const storedBooking = await Booking.create(newBooking);
    expect(storedBooking).toBeDefined();
    expect(storedBooking.user).toBe(newBooking.user);
    done();
  });
});
