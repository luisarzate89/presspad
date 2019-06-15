const {
  checkOtherBookingExists,
  createNewBooking,
  updateListingAvailability,
} = require("../../../database/queries/bookings");

const mongoose = require("mongoose");
const buildDB = require("../../../database/data/test/index");

const User = require("../../../database/models/User");
const Listing = require("../../../database/models/Listing");
const Booking = require("../../../database/models/Booking");

describe("Tests for booking queries", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test("Test check other booking request query with duplicate booking request", async (done) => {
    const interns = await User.find({ role: "intern" });
    // get bookings made by intern
    const bookings = await Booking.find({ user: interns[0]._id });
    expect(bookings).toBeDefined();

    // run query with existing booking dates
    await checkOtherBookingExists(interns[0]._id, bookings[0].startDate, bookings[0].endDate).then(
      (result) => {
        expect(result).toBeDefined();
        expect(result.bookingExists).toBe(true);
      },
    );
    done();
  });

  test("Test check other booking request query with valid booking request", async (done) => {
    const interns = await User.find({ role: "intern" });
    // get bookings made by intern
    const bookings = await Booking.find({ user: interns[0]._id });
    expect(bookings).toBeDefined();

    // run query with existing booking dates
    await checkOtherBookingExists(
      interns[0]._id,
      "2019-07-01T00:00:00.000Z",
      "2019-07-04T00:00:00.000Z",
    ).then((result) => {
      expect(result).toBeDefined();
      expect(result.bookingExists).toBe(false);
    });
    done();
  });

  test("Test for create booking query with valid request", async (done) => {
    const interns = await User.find({ role: "intern" });
    // get bookings made by intern
    const listing = await Listing.findOne();

    expect(listing).toBeDefined();

    const data = {
      listing: listing._id,
      user: interns[0]._id,
      startDate: "2019-07-01T00:00:00.000Z",
      endDate: "2019-07-04T00:00:00.000Z",
      payment: 40,
    };
    // run query
    await createNewBooking(data).then((result) => {
      expect(result).toBeDefined();
      expect(result._id).toBeDefined();
      expect(result.status).toBe("pending");
      expect(result.user).toBe(interns[0]._id);
    });
    done();
  });

  test("Test for create booking query with invalid request", async (done) => {
    const data = {};
    // run query
    await createNewBooking(data).catch((err) => {
      expect(err).toBeDefined();
    });
    done();
  });

  test("Test for update listing availability query with valid request", async (done) => {
    // get bookings made by intern
    const listing = await Listing.findOne();
    expect(listing).toBeDefined();

    // run query
    await updateListingAvailability(
      listing._id,
      "2019-07-01T00:00:00.000Z",
      "2019-07-04T00:00:00.000Z",
    ).then((result) => {
      expect(result).toBeDefined();
      expect(result.ok).toBe(1);
    });
    done();
  });

  test("Test for update listing availability query with invalid request", async (done) => {
    const listing = await Listing.findOne();
    expect(listing).toBeDefined();

    // run query
    await updateListingAvailability(listing._id, null, undefined).catch((err) => {
      expect(err).toBeDefined();
    });
    done();
  });
});
