const mongoose = require("mongoose");

const Notification = require("../../../database/models/Notification");
const User = require("../../../database/models/User");

const buildDB = require("../../../database/data/test");

describe("Test Notifications schema", () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test("should Notifications schema be defined", async () => {
    expect(Notification).toBeDefined();
  });

  test("should Notifications schema store correctly", async (done) => {
    // users
    const hosts = await User.find({ role: "host" });
    const interns = await User.find({ role: "intern" });

    const notification = {
      user: interns[0],
      secondParty: hosts[1],
      type: "stayApproved",
      private: false,
    };

    const storedNotification = await Notification.create(notification);
    expect(storedNotification).toBeDefined();

    // stored values
    expect(storedNotification.type).toBe(notification.type);
    expect(storedNotification.private).toBe(notification.private);
    expect(storedNotification.seen).toBe(false);
    done();
  });
});
