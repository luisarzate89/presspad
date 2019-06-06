import { createNewBooking } from "../../../database/queries/bookings";

const mongoose = require("mongoose");
const buildDB = require("../../../database/data/test/index");

const User = require("../../../database/models/User");
const Listing = require("../../../database/models/Listing");

describe("Tests for booking queries", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  test("Test create booking query with valid request", async (done) => {
    const intern = await User.findOne({ role: "intern" });
    const listing = await Listing.findOne();
    // check if intern has another booking request within that periode
    // maybe check if booking request fits availability of listing (already done via front)
    // create booking request and update availability
    // const data = {
    //   listing: listing._id,
    //   user: intern._id,
    //   startDate: {},
    //   endDate: {},
    // };
    await createNewBooking(intern._id).then((profileData) => {
      expect(profileData).toBeDefined();
      expect(profileData[0].email).toBe(hosts[0].email);
      expect(profileData[0].listing._id).toBeDefined();
      expect(profileData[0].profile._id).toBeDefined();
    });
    done();
  });
});
