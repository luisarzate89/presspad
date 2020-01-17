const mongoose = require("mongoose");

const ScheduledEmail = require("../../../database/models/ScheduledEmail");
const Booking = require("../../../database/models/Booking");

const buildDB = require("../../../database/data/test");

describe("Test ScheduledEmail schema", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test("should ScheduledEmail schema be defined", async () => {
    expect(ScheduledEmail).toBeDefined();
  });

  test("should ScheduledEmail schema store correctly", async (done) => {
    // users
    const bookings = await Booking.find();

    const scheduledEmail = {
      type: "BOOKING_REMINDER_1_WEEK",
      data: {
        recipient: "test@gmail.com",
        host: bookings[0].host,
        booking: bookings[0]._id,
      },
      isSent: false,
      dueDate: Date.now() + 7 * 24 * 60 * 60 * 1000, // after 7 days
    };

    const storedEmail = await ScheduledEmail.create(scheduledEmail);
    expect(storedEmail).toBeDefined();

    expect(storedEmail.type).toBe(scheduledEmail.type);
    done();
  });
});
