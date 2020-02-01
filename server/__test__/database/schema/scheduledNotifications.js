const mongoose = require('mongoose');

const ScheduledNotification = require('../../../database/models/ScheduledNotification');
const User = require('../../../database/models/User');

const buildDB = require('../../../database/data/test');

describe('Test ScheduledNotification schema', () => {
  beforeAll(async () => {
    // build dummy data
    await buildDB();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test('should ScheduledNotification schema be defined', async () => {
    expect(ScheduledNotification).toBeDefined();
  });

  test('should ScheduledNotification schema store correctly', async done => {
    // users
    const hosts = await User.find({ role: 'host' });
    const interns = await User.find({ role: 'intern' });

    const scheduledNotification = {
      user: interns[0],
      secondParty: hosts[1],
      type: 'stayApproved',
      private: false,
      dueDate: Date.now() + 7 * 24 * 60 * 60 * 1000,
    };

    const storedNotification = await ScheduledNotification.create(
      scheduledNotification,
    );
    expect(storedNotification).toBeDefined();

    // stored values
    expect(storedNotification.type).toBe(scheduledNotification.type);
    expect(storedNotification.private).toBe(scheduledNotification.private);
    done();
  });

  test('should validation work correctly', async done => {
    // users
    const hosts = await User.find({ role: 'host' });
    const interns = await User.find({ role: 'intern' });

    const scheduledNotification = {
      user: interns[0],
      secondParty: hosts[1],
      type: 'stayApproved',
      private: false,
      dueDate: Date.now() - 7 * 24 * 60 * 60 * 1000, // before 7 days
    };

    try {
      await ScheduledNotification.create(scheduledNotification);
    } catch (error) {
      expect(error).toBeDefined();
      done();
    }
  });
});
